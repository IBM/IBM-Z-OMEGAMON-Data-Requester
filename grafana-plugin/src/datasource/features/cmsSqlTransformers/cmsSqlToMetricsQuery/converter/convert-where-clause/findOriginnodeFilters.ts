import { ColumnMetadataMap } from 'public-domain';

import {
  TokenMapping,
  ConverterError,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter/internals';
import {
  exprIsIdentifier,
  getNodeTokens,
  identifierIs,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';

import { convertToMetricsQueryFilter } from './convertToMetricsQueryFilter';
import { findExpressions } from './findExpressions';
import { IntermediateFilter } from './intermediateFilter';

export type OriginnodesExtractionResult = {
  originnodes: string[];
  commonNode: IntermediateFilter | null;
};

export function findOriginnodeFilters(
  root: IntermediateFilter,
  mapping: TokenMapping,
  columnsMd: ColumnMetadataMap
): OriginnodesExtractionResult {
  const paths = findExpressions(
    root,
    (expr) => expr.nodeType === 'binary' && exprIsIdentifier(expr.left) && identifierIs(expr.left, 'ORIGINNODE')
  );

  // There are 3 allowed situations:
  // 1. Root is a ORIGINNODE clause
  //   WHERE ORIGINNODE = ''
  // 2. Root is a AND-connector containing 1 ORIGINNODE clause (and unlimited amount of others)
  //   WHERE ORIGINNODE = '' AND FIELD = 42
  // 3. There is single OR-connector with all clauses being ORIGINNODES
  //   This connector is either part of root AND-connector or root itself
  //   WHERE (ORIGINNODE = '' OR ORIGINNODE = '') AND (....)

  const [firstPath] = paths;

  if (!firstPath) {
    return {
      originnodes: [],
      commonNode: null,
    };
  }

  // TODO: rename entries
  const [originnodeOfFirstPath, parentIfAny, rootOfFirstPath] = firstPath;

  const allOriginnodesAsAstExp = paths.map(([first]) => first.expression);

  const multipleOccurrencesAllowed = parentIfAny?.connector === 'or_condition_connector';
  if (multipleOccurrencesAllowed && parentIfAny.items.length > paths.length) {
    throw new ConverterError('Mixing ORIGINNODE and non-ORIGINNODE filters is not allowed', allOriginnodesAsAstExp);
  }

  if (paths.length > 1 && !multipleOccurrencesAllowed) {
    throw new ConverterError('Unexpected appearance of ORIGINNODE filter', allOriginnodesAsAstExp);
  }

  if (firstPath.length > 3) {
    throw new ConverterError('Unexpected appearance of ORIGINNODE filter', allOriginnodesAsAstExp);
  }

  if (rootOfFirstPath && rootOfFirstPath.connector !== 'and_condition_connector') {
    throw new ConverterError('Unexpected appearance of ORIGINNODE filter', allOriginnodesAsAstExp);
  }

  const originnodes: string[] = [];
  paths.forEach(([onElement, parent, pathRoot], idx) => {
    if (parent !== parentIfAny || pathRoot !== rootOfFirstPath) {
      throw new ConverterError('Unexpected appearance of ORIGINNODE filter', [onElement.expression]);
    }

    const filter = convertToMetricsQueryFilter(onElement, mapping, columnsMd);

    const clause = filter?.clause;

    if (!clause) {
      // Should never happen
      throw new ConverterError('Binary expression is expected', [onElement.expression]);
    }

    if (clause.operator !== '=') {
      throw new ConverterError('Only "equal to" operator is allowed in ORIGINNODE filters', [onElement.expression]);
    }

    const value = filter?.clause?.userDefinedValue;
    if (!value || typeof value !== 'string') {
      throw new ConverterError('String literal is expected', [onElement.expression]);
    }

    const valueAsString = String(value);

    // Should it only expose value instead of whole expression?
    const tokens = getNodeTokens(onElement.expression);
    mapping.registerTokens(tokens, originnodes);
    mapping.registerTokens(tokens, originnodes, idx);

    originnodes.push(valueAsString);
  });

  const commonFilterNode = parentIfAny?.connector === 'or_condition_connector' ? parentIfAny : originnodeOfFirstPath;

  return {
    originnodes,
    commonNode: commonFilterNode,
  };
}
