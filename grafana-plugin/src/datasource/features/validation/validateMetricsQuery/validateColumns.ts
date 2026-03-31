import { writetimeColumnMetadata, ColumnMetadata, TableMetadata, KNOWN_COLUMN_TYPES } from 'public-domain';

import {
  AggregationFuncName,
  ALLOWED_AGGREGATION_FUNCS,
  MetricsQueryColumn,
  MetricsQueryParams,
} from 'datasource/domain';
import { TokenMapping } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter';

import { ValidationProblem, inappropriateWritetimeColumnMessage } from './validatorCommon';

const writeTimeRegex = new RegExp(writetimeColumnMetadata.id, 'i');
const dummyRegex = /\$DUMMY/i;

const allowedAggregationFunctions: { [key in ColumnMetadata['type']]: readonly AggregationFuncName[] | undefined } = {
  string: ['COUNT'],
  itmTimestamp: ['COUNT', 'MIN', 'MAX'],
  number: ALLOWED_AGGREGATION_FUNCS,
  timestamp: ['COUNT', 'MIN', 'MAX'],
};

function checkForInapropriateWriteTime(
  history: boolean,
  column: MetricsQueryColumn,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem | null {
  return history === false && writeTimeRegex.test(column.id)
    ? {
        severity: 'error',
        message: inappropriateWritetimeColumnMessage,
        affectedTokens: getTokensOf?.(column, 'id'),
      }
    : null;
}

function checkIfColumnIsInMetadata(
  column: MetricsQueryColumn,
  tableMetadata: TableMetadata,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem | null {
  return !tableMetadata.columns[column.id.toUpperCase()]
    ? {
        // Dashboard can be built with newer version of agent in mind.
        // Thus, it is possible that it contains columns TEMS have no idea about.
        // We allow that in SELECT clause since versioning will handle it just fine.
        // (see OMUI5-1173 for details)
        severity: 'warning',
        message: `Column "${column.id}" not found in table "${tableMetadata.applicationCode}.${tableMetadata.id}"`,
        affectedTokens: getTokensOf?.(column, 'id'),
      }
    : null;
}

function checkIfColumnTypeIsValid(
  column: MetricsQueryColumn,
  tableMetadata: TableMetadata,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem | null {
  const columnType = tableMetadata.columns[column.id.toUpperCase()]?.type;
  if (columnType != null && !KNOWN_COLUMN_TYPES.includes(columnType)) {
    return {
      severity: 'error',
      message: `Unknown type "${columnType}" for column "${column.id}"`,
      affectedTokens: getTokensOf?.(column, 'id'),
    };
  }
  return null;
}

function checkIfNonAggregatedColumnIsInSelectButNotGroupBy(
  groupBy: string[],
  column: MetricsQueryColumn,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem | null {
  const idRegex = new RegExp(column.id, 'i');
  return groupBy.length &&
    !column.aggregationFunction &&
    !groupBy.find((groupByColumnId) => idRegex.test(groupByColumnId))
    ? {
        severity: 'error',
        message: `Column "${column.id}" is in SELECT without aggregation function and is not in GROUP BY`,
        affectedTokens: getTokensOf?.(column, 'id'),
      }
    : null;
}

function checkAggregationFunctionType(
  column: MetricsQueryColumn,
  tableMetadata: TableMetadata,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem | null {
  if (column.aggregationFunction) {
    const columnType = tableMetadata.columns[column.id.toUpperCase()]?.type;
    if (columnType == null) {
      // Unknown columns checked in checkIfColumnIsInMetadata
      return null;
    }
    const allowedAggregationFunctionsForType = allowedAggregationFunctions[columnType];
    if (
      allowedAggregationFunctionsForType != null &&
      !allowedAggregationFunctionsForType.includes(column.aggregationFunction)
    ) {
      return {
        severity: 'error',
        message: `Aggregation function "${column.aggregationFunction}" is not compatible with column type "${columnType}" for column "${column.id}"`,
        affectedTokens: getTokensOf?.(column, 'aggregationFunction'),
      };
    }
  }
  return null;
}

function checkForGroupByWithoutAggregationFunction(
  queryObject: MetricsQueryParams,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem | null {
  return queryObject.groupBy.length && !queryObject.columns.find(({ aggregationFunction }) => aggregationFunction)
    ? {
        severity: 'error',
        message: 'GROUP BY clause is present but no aggregation functions are found in SELECT clause',
        affectedTokens: getTokensOf?.(queryObject, 'columns'),
      }
    : null;
}

function validateSelect(
  queryObject: MetricsQueryParams,
  tableMetadata: TableMetadata,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem[] {
  const problems: ValidationProblem[] = [];
  const addIfProblemExists = (problem: ValidationProblem | null) => {
    if (problem) {
      problems.push(problem);
    }
  };

  queryObject.columns.forEach((column) => {
    addIfProblemExists(checkForInapropriateWriteTime(queryObject.history, column, getTokensOf));
    addIfProblemExists(checkIfColumnIsInMetadata(column, tableMetadata, getTokensOf));
    addIfProblemExists(checkIfColumnTypeIsValid(column, tableMetadata, getTokensOf));
    addIfProblemExists(checkIfNonAggregatedColumnIsInSelectButNotGroupBy(queryObject.groupBy, column, getTokensOf));
    addIfProblemExists(checkAggregationFunctionType(column, tableMetadata, getTokensOf));
  });

  addIfProblemExists(checkForGroupByWithoutAggregationFunction(queryObject, getTokensOf));

  return problems;
}

function validateGroupBy(
  queryObject: MetricsQueryParams,
  tableMetadata: TableMetadata,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem[] {
  return queryObject.groupBy.reduce((problems, columnId, index) => {
    if (queryObject.history === false && writeTimeRegex.test(columnId)) {
      problems.push({
        severity: 'error',
        message: inappropriateWritetimeColumnMessage,
        affectedTokens: getTokensOf?.(queryObject.groupBy, index),
      });
    }

    if (!dummyRegex.test(columnId) && !tableMetadata.columns[columnId.toUpperCase()]) {
      problems.push({
        severity: 'error',
        message: `Attribute "${columnId}" in attribute group "${tableMetadata.applicationCode}.${tableMetadata.id}" isn't supported by any existing agents and cannot be used in GROUP BY clause.`,
        affectedTokens: getTokensOf?.(queryObject.groupBy, index),
      });
    }

    return problems;
  }, [] as ValidationProblem[]);
}

function validateOrderBy(
  queryObject: MetricsQueryParams,
  tableMetadata: TableMetadata,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem[] {
  return queryObject.orderBy.reduce((prev, curr) => {
    if (!tableMetadata.columns[curr.columnId.toUpperCase()]) {
      prev.push({
        severity: 'error',
        message: `Attribute "${curr.columnId}" in attribute group "${tableMetadata.applicationCode}.${tableMetadata.id}" isn't supported by any existing agents and cannot be used in ORDER BY clause.`,
        affectedTokens: getTokensOf?.(curr, 'columnId'),
      });
    }
    if (queryObject.history === false && writeTimeRegex.test(curr.columnId)) {
      prev.push({
        severity: 'error',
        message: inappropriateWritetimeColumnMessage,
        affectedTokens: getTokensOf?.(curr, 'columnId'),
      });
    }
    return prev;
  }, [] as ValidationProblem[]);
}

export function validateColumns(
  queryObject: MetricsQueryParams,
  tableMetadata: TableMetadata,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem[] {
  const tableMetadataWithWritetime = {
    ...tableMetadata,
    columns: { ...tableMetadata.columns, [writetimeColumnMetadata.id]: writetimeColumnMetadata },
  };
  if (!queryObject.columns.length) {
    return [
      {
        severity: 'error',
        message: 'No columns in query',
        affectedTokens: getTokensOf?.(queryObject, 'columns'),
      },
    ];
  }
  return [
    ...validateSelect(queryObject, tableMetadataWithWritetime, getTokensOf),
    ...validateGroupBy(queryObject, tableMetadataWithWritetime, getTokensOf),
    ...validateOrderBy(queryObject, tableMetadataWithWritetime, getTokensOf),
  ];
}
