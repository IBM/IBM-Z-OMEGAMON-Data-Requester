import { ColumnMetadataMap } from 'public-domain';

import { MetricsQueryParams, MetricsQueryParma, SourceDef } from 'datasource/domain';
import { parseAgentDef } from 'datasource/domain/agentDefUtils';
import {
  ConversionProblem,
  TokenMapping,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter/internals';
import { WhereClause } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';
import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { buildIntermediateRepresentation } from './buildIntermediateRepresentation';
import { convertToMetricsQueryFilter } from './convertToMetricsQueryFilter';
import { findFirstAndLastFuncCalls } from './findFirstAndLastFuncCalls';
import { findOriginnodeFilters } from './findOriginnodeFilters';
import { ParmasExtractionResult, findParmas } from './findParmas';
import { findWritetimeFilters } from './findWritetimeFilters';
import { IntermediateFilter, IntermediateFilterExpression } from './intermediateFilter';
import { splitNodelist } from './splitNodelist';

function splitParmas(parmas: ParmasExtractionResult[]): {
  generalParmas: ParmasExtractionResult[];
  nodelistParmas: ParmasExtractionResult[];
} {
  return {
    generalParmas: parmas.filter(({ parma: { name } }) => name !== 'NODELIST'),
    nodelistParmas: parmas.filter(({ parma: { name } }) => name === 'NODELIST'),
  };
}

function convertParmas(generalParmas: ParmasExtractionResult[], mapping: TokenMapping): MetricsQueryParma[] {
  const parmas = generalParmas.map((result) => result.parma);

  generalParmas.forEach((parma, idx) => {
    mapping.registerTokens(parma.tokens, parmas);
    mapping.registerTokens(parma.tokens, parmas, idx);
  });

  return parmas;
}

function convertAgentsAndGroups(
  nodelistParmas: ParmasExtractionResult[],
  originnodes: string[],
  mapping: TokenMapping
): { agentsAndGroups: SourceDef[]; agentsProblems: ConversionProblem[] } {
  const agentsAndGroups: SourceDef[] = [];
  const agentsProblems: ConversionProblem[] = [];

  const pushNode = (nodeText: string, assignedTokens: Token[]) => {
    try {
      const agentDef = parseAgentDef(nodeText);
      agentsAndGroups.push(agentDef);
      // Reapply mapping: Step 1
      mapping.registerTokens(assignedTokens, agentDef);
    } catch (e) {
      agentsProblems.push({
        message: `Cannot use "${nodeText}" as an agent identification: "${e?.toString()}"`,
        severity: 'error',
        affectedTokens: assignedTokens,
      });
    }
    // Reapply mapping: Step 2. Is made outside of try...catch
    mapping.registerTokens(assignedTokens, agentsAndGroups);
  };

  originnodes.forEach((originnode, idx) => {
    const tokens = mapping.getTokensOf(originnodes, idx);
    pushNode(originnode, tokens);

    agentsProblems.push({
      message:
        "ORIGINNODE is handled in SYSTEM.PARMA('NODELIST'), will be moved to this section on Update Query Editor form",
      severity: 'informational',
      affectedTokens: tokens,
    } as ConversionProblem);
  });

  if (nodelistParmas.length > 1) {
    const problems = nodelistParmas.map((parma) => {
      return {
        message: 'There should be only one NODELIST',
        severity: 'error',
        affectedAstNodes: [parma.filterNode.expression],
      } as ConversionProblem;
    });
    agentsProblems.push(...problems);
    return { agentsAndGroups: [], agentsProblems };
  }

  const nodelistParmaToUse = nodelistParmas[0]?.parma;
  if (!nodelistParmaToUse) {
    return { agentsAndGroups, agentsProblems };
  }

  const tokens = mapping.getTokensOf(nodelistParmaToUse, 'value');
  const valueToUse = nodelistParmaToUse.value || '';
  if (!valueToUse || valueToUse.trim() === '') {
    agentsProblems.push({
      message: "SYSTEM.PARMA('NODELIST') should not be empty",
      severity: 'error',
      affectedTokens: tokens,
    });

    return { agentsAndGroups: [], agentsProblems };
  }

  const nodelist = splitNodelist(valueToUse);
  nodelist.forEach((node) => {
    pushNode(node, tokens);
  });

  return { agentsAndGroups, agentsProblems };
}

function getNewRoot(root: IntermediateFilter, filters: Array<IntermediateFilter | null>): IntermediateFilter | null {
  let newRoot: IntermediateFilter | null = root;
  if (root.filterType === 'connection' && root.connector === 'and_condition_connector') {
    newRoot = {
      ...root,
      items: root.items.filter((filterExpr) => !filters.includes(filterExpr)),
    };
  }
  if (filters.includes(root)) {
    newRoot = null;
  }
  return newRoot;
}

export function convertWhereClause(
  clause: WhereClause | null,
  mapping: TokenMapping,
  columnMds: ColumnMetadataMap
): Pick<MetricsQueryParams, 'agentsAndGroups' | 'filter' | 'parmas' | 'first'> & {
  writeTimeFilters: IntermediateFilterExpression[];
  problems: ConversionProblem[];
} {
  if (!clause) {
    return {
      agentsAndGroups: [],
      filter: {},
      parmas: [],
      writeTimeFilters: [],
      problems: [],
    };
  }
  const root = buildIntermediateRepresentation(clause.filter);
  const filteredOutFilters: Array<IntermediateFilter | null> = [];
  const problems: ConversionProblem[] = [];

  const { originnodes, commonNode: originnodeCommonFilter } = findOriginnodeFilters(root, mapping, columnMds);
  filteredOutFilters.push(originnodeCommonFilter);

  const parmasResult = findParmas(root, mapping);
  filteredOutFilters.push(...parmasResult.map((parma) => parma.filterNode));

  const { generalParmas, nodelistParmas } = splitParmas(parmasResult);

  const parmas = convertParmas(generalParmas, mapping);

  const { agentsAndGroups, agentsProblems } = convertAgentsAndGroups(nodelistParmas, originnodes, mapping);
  problems.push(...agentsProblems);

  const { first, filterNode: firstOrLastNode } = findFirstAndLastFuncCalls(root, mapping);
  filteredOutFilters.push(firstOrLastNode);
  if (typeof first === 'number') {
    problems.push({
      severity: 'warning',
      message: 'Row limits are ignored',
      affectedAstNodes: [firstOrLastNode.expression],
    });
  }

  const writeTimeFilters = findWritetimeFilters(root);
  filteredOutFilters.push(...writeTimeFilters);

  const newRoot = getNewRoot(root, filteredOutFilters);

  const filter = { nonAggregated: convertToMetricsQueryFilter(newRoot, mapping, columnMds) || undefined };
  if (filter.nonAggregated) {
    mapping.registerTokens(mapping.getTokensOf(filter.nonAggregated), filter);
    // TODO Add aggregated part as well
  }

  return {
    agentsAndGroups,
    parmas,
    filter,
    first,
    writeTimeFilters,
    problems,
  };
}
