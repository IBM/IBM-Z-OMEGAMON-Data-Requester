import { MetricsQueryOrderByItem, MetricsQueryParams } from 'datasource/domain';
import {
  HistoryClause,
  GroupByClause,
  getAsColumnId,
  getNodeTokens,
  OrderByClause,
  AtClause,
  SelectStatement,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';
import { MetadataLoader } from 'datasource/features/metadata';

import { convertWhereClause, IntermediateFilterExpression } from './convert-where-clause';
import { convertFromClause } from './convertFromClause';
import { convertSelectClause } from './convertSelectClause';
import { ConversionProblem, TokenMapping, ConverterError } from './internals';

function isHistory(clause: HistoryClause | null): boolean {
  return clause != null;
}

function convertGroupBy(clause: GroupByClause | null, mapping: TokenMapping): string[] {
  if (!clause) {
    return [];
  }

  const result: string[] = [];
  clause.columns.forEach((identifier, idx) => {
    result.push(getAsColumnId(identifier));
    mapping.registerTokens(getNodeTokens(identifier), result, idx);
  });
  mapping.registerTokens(getNodeTokens(clause), result);

  return result;
}

function convertOrderBy(clause: OrderByClause | null, mapping: TokenMapping): MetricsQueryOrderByItem[] {
  if (!clause) {
    return [];
  }

  const result = clause.items.map((item) => {
    const orderByElement = {
      columnId: getAsColumnId(item.identifier),
      // default is ASC
      type: item.direction?.kind === 'desc_order_direction' ? 'DESC' : 'ASC',
    } as MetricsQueryOrderByItem;

    mapping.registerTokens(getNodeTokens(item), orderByElement);
    mapping.registerTokens(getNodeTokens(item.identifier), orderByElement, 'columnId');
    mapping.registerTokens(item.direction ? [item.direction] : [], orderByElement, 'type');

    return orderByElement;
  });

  mapping.registerTokens(getNodeTokens(clause), result);

  return result;
}

function checkAtClause(clause: AtClause | null): ConversionProblem | null {
  return clause
    ? {
        message: 'AT clause is generated automatically, any hardcoded AT clause in the formula will be ignored',
        severity: 'informational',
        affectedAstNodes: [clause],
      }
    : null;
}

async function runConversion(
  statement: SelectStatement,
  mapping: TokenMapping,
  metadataLoader: MetadataLoader
): Promise<{
  query: MetricsQueryParams;
  writeTimeFilters: IntermediateFilterExpression[];
  problems: ConversionProblem[];
}> {
  if (statement.having) {
    throw new ConverterError('HAVING clause is not supported', [statement.having]);
  }

  let applications = null;
  try {
    applications = await metadataLoader.getApplicationMetadatas();
  } catch (error) {
    let errorMessage = error;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new ConverterError(`Error occurred while getting applications metadata: ${errorMessage}`, [statement]);
  }

  const columns = convertSelectClause(statement.select, mapping);
  const { affinityId, tableId } = convertFromClause(statement.from, applications, mapping);
  const history = isHistory(statement.history);

  let tableMd = null;
  try {
    tableMd = await metadataLoader.getTableMetadata(tableId);
  } catch (error) {
    let errorMessage = error;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new ConverterError(`Converter error: ${errorMessage}`, [statement]);
  }

  const { agentsAndGroups, filter, first, parmas, writeTimeFilters, problems } = convertWhereClause(
    statement.where,
    mapping,
    tableMd.columns
  );
  const groupBy = convertGroupBy(statement.groupBy, mapping);
  const orderBy = convertOrderBy(statement.orderBy, mapping);

  const query: MetricsQueryParams = {
    affinityId,
    tableId,
    columns,
    agentsAndGroups,
    filter,
    parmas,
    history,
    groupBy,
    orderBy,
  };

  if (first != null) {
    query.first = first;
  }

  mapping.registerRootAttachedNodes(getNodeTokens(statement.history), 'history');
  mapping.setRoot(getNodeTokens(statement), query);

  return {
    query,
    writeTimeFilters,
    problems,
  };
}

type SuccessfulCmsSqlToQueryResult = {
  query: MetricsQueryParams;
  getTokensOf: TokenMapping['getTokensOf'];
  problems: ConversionProblem[];
};

type FailedCmsSqlToQueryResult = {
  query: null;
  getTokensOf: null;
  problems: ConversionProblem[];
};

type CmsSqlToQueryResult = FailedCmsSqlToQueryResult | SuccessfulCmsSqlToQueryResult;

export async function convertToMetricsQuery(
  statement: SelectStatement,
  metadataLoader: MetadataLoader
): Promise<CmsSqlToQueryResult> {
  try {
    const mapping = new TokenMapping();
    const {
      query,
      writeTimeFilters,
      problems: innerProblems,
    } = await runConversion(statement, mapping, metadataLoader);
    const getTokensOf = mapping.getTokensOf.bind(mapping);
    const problems: ConversionProblem[] = [];
    if (writeTimeFilters.length) {
      problems.push({
        severity: 'informational',
        message: 'Grafana time range selector should be used to define time range. WRITETIME filters will be ignored',
        affectedAstNodes: writeTimeFilters.map(({ expression }) => expression),
      });
    }
    const atClauseProblem = checkAtClause(statement.at);
    if (atClauseProblem) {
      problems.push(atClauseProblem);
    }
    return {
      query,
      problems: [...problems, ...innerProblems],
      getTokensOf,
    };
  } catch (e) {
    if (e instanceof ConverterError) {
      const { message, affectedNodes } = e;
      return {
        query: null,
        getTokensOf: null,
        problems: affectedNodes.map(
          (affectedNode): ConversionProblem => ({
            message,
            severity: 'error',
            affectedAstNodes: [affectedNode],
          })
        ),
      };
    }
    return {
      query: null,
      getTokensOf: null,
      problems: [
        {
          message: `Unexpected error: ${String(e instanceof Error ? e.message : e)}`,
          severity: 'error',
          affectedAstNodes: [statement],
        },
      ],
    };
  }
}
