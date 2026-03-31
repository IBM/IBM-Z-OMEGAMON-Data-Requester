import { ColumnMetadata, TableMetadata } from 'public-domain';

import { MetricsQueryFilter, MetricsQueryFilterClause } from 'datasource/domain';
import { flattenFilterClauses } from 'datasource/domain/filters';
import { TokenMapping } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter';
import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';
import { reverseFormatAndApplyEnums } from 'datasource/features/formatting/reverseFormat';
import { hasVariable } from 'datasource/features/variables/utils';

import { ValidationProblem } from './validatorCommon';

export function validateFilters(
  filters: {
    aggregated?: MetricsQueryFilter;
    nonAggregated?: MetricsQueryFilter;
  },
  tableMetadata: TableMetadata,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem[] {
  const problemsMap = flattenFilterClauses(filters).map((clause) =>
    validateFilterClause(clause, tableMetadata, getTokensOf)
  );
  return problemsMap.filter(Boolean) as ValidationProblem[];
}

function validateFilterClause(
  clause: MetricsQueryFilterClause,
  tableMetadata: TableMetadata,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem | null {
  const columnMetadata = tableMetadata.columns[clause.columnId.toUpperCase()];
  if (!columnMetadata) {
    const column = clause.columnId;
    const appCode = tableMetadata.applicationCode;
    const tableId = tableMetadata.id;
    return {
      severity: 'error',
      message: `Attribute "${column}" in attribute group "${appCode}.${tableId}" isn't supported by any existing agents and cannot be used in filters.`,
      affectedTokens: getTokensOf?.(clause),
    };
  }

  const valueValidationProblem = validateUserDefinedValue(
    clause.userDefinedValue,
    columnMetadata,
    getTokensOf?.(clause, 'userDefinedValue')
  );

  if (!valueValidationProblem) {
    return null;
  }

  return {
    severity: 'error',
    message: `${valueValidationProblem.message} for column "${clause.columnId}"`,
    affectedTokens: valueValidationProblem.affectedTokens,
  };
}

export function validateUserDefinedValue(
  userDefinedValue: string,
  columnMetadata: ColumnMetadata,
  affectedTokens?: Token[] | undefined
): ValidationProblem | null {
  if (hasVariable(userDefinedValue)) {
    return null;
  }

  try {
    reverseFormatAndApplyEnums(userDefinedValue, columnMetadata);
  } catch (error) {
    return {
      severity: 'error',
      message: `Literal "${userDefinedValue}" does not match required type "${columnMetadata.type}"`,
      affectedTokens,
    };
  }

  return null;
}
