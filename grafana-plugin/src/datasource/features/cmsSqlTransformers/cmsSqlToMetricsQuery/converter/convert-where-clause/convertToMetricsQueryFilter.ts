import { errorToString } from 'public-common';
import { ColumnMetadata, ColumnMetadataMap } from 'public-domain';

import { ComparisonOperator, MetricsQueryFilter } from 'datasource/domain';
import {
  ConverterError,
  TokenMapping,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter/internals';
import {
  Expression,
  exprIsIdentifier,
  getAsColumnId,
  getNodeTokens,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';
import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';
import { applyAllFormatting } from 'datasource/features/formatting/format';
import { hasVariable } from 'datasource/features/variables/utils';

import { IntermediateFilterExpression, IntermediateFilter } from './intermediateFilter';

const OPERATOR_MAP = {
  eq_comparison_operator: '=',
  ne_comparison_operator: '<>',
  gt_comparison_operator: '>',
  ge_comparison_operator: '>=',
  lt_comparison_operator: '<',
  le_comparison_operator: '<=',
  like_comparison_operator: 'LIKE',
} as const satisfies Record<string, ComparisonOperator>;

function applyFormat(value: string | number, columnMd: ColumnMetadata, expression: Expression): string {
  try {
    const formattedValue = hasVariable(value.toString()) ? value : applyAllFormatting(value, columnMd);
    return formattedValue.toString();
  } catch (err) {
    throw new ConverterError(errorToString(err), [expression]);
  }
}

function expressionToUserDefinedValue(expr: Expression): string | number {
  switch (expr.nodeType) {
    case 'value':
      return expr.asUserDefinedValue;
    case 'unary': {
      const value = expressionToUserDefinedValue(expr.childExpr);
      if (typeof value !== 'number') {
        throw new Error('Expected number value in unary expression');
      }
      return expr.operator.kind === 'sub_arithmetic_operator' ? value * -1 : value;
    }
    default:
      throw new ConverterError('Literal or variable is expected', [expr]);
  }
}

function convertExpression(
  { expression }: IntermediateFilterExpression,
  mapping: TokenMapping,
  columnsMd: ColumnMetadataMap
): MetricsQueryFilter {
  if (expression.nodeType === 'function_call') {
    throw new ConverterError('Functions are not supported', [expression]);
  }

  if (expression.nodeType !== 'binary') {
    throw new ConverterError('Binary expression is expected', [expression]);
  }

  const { left, right, operator: operatorToken } = expression;

  if (!exprIsIdentifier(left)) {
    if (left.nodeType === 'function_call') {
      throw new ConverterError('Functions are not supported', [left]);
    }
    throw new ConverterError('Identifier is expected', [left]);
  }

  if (operatorToken.genericKind !== 'comparison_operator') {
    throw new ConverterError('Comparison operator is expected', [expression]);
  }

  const columnId = getAsColumnId(left);
  const operator = OPERATOR_MAP[operatorToken.kind];

  const columnMd = columnsMd[columnId];
  if (!columnMd) {
    throw new ConverterError(`No column metadata for formatting, column id ${columnId}`, [expression]);
  }

  const userDefinedValue = applyFormat(expressionToUserDefinedValue(right), columnMd, expression);

  const result = {
    clause: {
      columnId,
      operator,
      userDefinedValue,
    },
  };

  mapping.registerTokens(getNodeTokens(expression), result);
  mapping.registerTokens(getNodeTokens(expression), result.clause);
  mapping.registerTokens(getNodeTokens(left), result.clause, 'columnId');
  mapping.registerTokens([operatorToken], result.clause, 'operator');
  mapping.registerTokens(getNodeTokens(right), result.clause, 'userDefinedValue');

  return result;
}

function getAllExpressions(filter: IntermediateFilter): IntermediateFilterExpression[] {
  if (filter.filterType === 'expression') {
    return [filter];
  }

  return filter.items.reduce((acc, item) => {
    acc.push(...getAllExpressions(item));
    return acc;
  }, [] as IntermediateFilterExpression[]);
}

function getFilterTokens(filter: IntermediateFilter): Token[] {
  return getAllExpressions(filter).reduce((acc, expr) => {
    acc.push(...getNodeTokens(expr.expression));
    return acc;
  }, [] as Token[]);
}

export function convertToMetricsQueryFilter(
  filter: IntermediateFilter | null,
  mapping: TokenMapping,
  columnsMd: ColumnMetadataMap
): MetricsQueryFilter | null {
  if (!filter) {
    return null;
  }

  if (filter.filterType === 'expression') {
    return convertExpression(filter, mapping, columnsMd);
  }

  const { items: inputItems } = filter;

  const items = inputItems
    .map((childFilter) => convertToMetricsQueryFilter(childFilter, mapping, columnsMd))
    .filter((item) => item != null) as MetricsQueryFilter[];

  if (items.length === 0) {
    return null;
  }
  if (items.length === 1) {
    return items[0] ?? null;
  }

  const connector = filter.connector === 'and_condition_connector' ? 'and' : 'or';

  const result = {
    [connector]: items,
  } as unknown as MetricsQueryFilter;

  const tokens = getFilterTokens(filter);
  mapping.registerTokens(tokens, result);
  mapping.registerTokens(tokens, result[connector] as MetricsQueryFilter[]);

  return result;
}

export const testExports = { expressionToUserDefinedValue };
