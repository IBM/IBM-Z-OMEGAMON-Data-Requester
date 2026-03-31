import { TableMetadata, ColumnMetadata } from 'public-domain';

import {
  MetricsQueryFilter_V4,
  MetricsQueryFilterClause_V4,
  MetricsQueryFilters_V4,
  MetricsQueryParams_V4,
} from './FalconQuery_V4';
import type { MetricsQueryFilter_V5, MetricsQueryFilters_V5, MetricsQueryParams_V5 } from './FalconQuery_V5';

export function prepareQueryParams_V5(query: MetricsQueryParams_V4, tableMd: TableMetadata): MetricsQueryParams_V5 {
  const transformClause = (clause: MetricsQueryFilterClause_V4) => {
    const columnMd = tableMd.columns[clause.columnId];
    const userDefinedValueStringified = clause.userDefinedValue.toString();

    if (!columnMd) {
      return { clause: { ...clause, userDefinedValue: userDefinedValueStringified } };
    }

    const value = hasVariable(userDefinedValueStringified)
      ? userDefinedValueStringified
      : formatAndApplyEnums(clause.userDefinedValue, columnMd).toString();

    return { clause: { ...clause, userDefinedValue: value } };
  };

  const { filter: initialFilter } = query;
  const transformedFilter = transformMetricsQueryFilters(initialFilter, transformClause);

  const preparedQuery = {
    ...query,
    filter: transformedFilter,
  };
  return preparedQuery;
}

function formatAndApplyEnums(value: string | number, columnMd: ColumnMetadata): string | number | Date {
  const formattedValue = formatAndNotApplyEnums(value, columnMd);

  if (formattedValue instanceof Date) {
    return formattedValue;
  }

  const enumValue = columnMd.enums?.[formattedValue];

  if (enumValue != null) {
    return enumValue;
  }

  return formattedValue;
}

export function formatAndNotApplyEnums(value: string | number, columnMd: ColumnMetadata): string | number | Date {
  if (columnMd.type === 'itmTimestamp') {
    const formattedTimestamp = formatTimestamp(value);
    return formattedTimestamp;
  }
  if (columnMd.type === 'number') {
    const formattedNumber = formatNumber(value, columnMd);
    return formattedNumber;
  }
  return value;
}

// TIMESTAMPS
const INVALID_TIMESTAMP = new Date(NaN);

const ITM_TIMESTAMP_FORMAT = 'CYYMMDDhhmmss000';
const ITM_TIMESTAMP_LENGTH = ITM_TIMESTAMP_FORMAT.length;
function formatTimestamp(itmTimestamp: string | number, columnMd?: ColumnMetadata): Date {
  const trimmed = `${itmTimestamp}`.trim();

  if (!validateItmTimestamp(trimmed)) {
    console.log('Warning: invalid timestamp', itmTimestamp, columnMd);
    return INVALID_TIMESTAMP;
  }

  const date = itmTimestampToUnixTimestamp(trimmed);
  return date;
}

function validateItmTimestamp(itmTimestamp: string): boolean {
  const hasOnlyDigits = /^\d+$/.test(itmTimestamp);
  const isValidLength = itmTimestamp.length === ITM_TIMESTAMP_LENGTH;

  return (
    hasOnlyDigits &&
    isValidLength &&
    /**
     * See features/format/README.md
     */
    itmTimestamp !== '0000000000000000'
  );
}

function itmTimestampToUnixTimestamp(itmTimestamp: string): Date {
  const century = Number(itmTimestamp[0]) + 19;
  const year = Number(itmTimestamp.substring(1, 3));
  const month = Number(itmTimestamp.substring(3, 5)) - 1;
  const day = Number(itmTimestamp.substring(5, 7));
  const hour = Number(itmTimestamp.substring(7, 9));
  const minute = Number(itmTimestamp.substring(9, 11));
  const second = Number(itmTimestamp.substring(11, 13));
  const millisecond = Number(itmTimestamp.substring(13, 16));

  const date = new Date(century * 100 + year, month, day, hour, minute, second, millisecond);
  return date;
}

// formatNumber
function formatNumber(value: number | string, columnMd: ColumnMetadata): string | number {
  const asNumber = convertToNumber(value);

  if (columnMd.printf && shouldFormatNumberAsHex(columnMd.printf)) {
    const asHex = formatNumberAsHex(asNumber, columnMd.printf);
    return asHex;
  }
  const scaled = scale(asNumber, columnMd.scaleFactor);
  return scaled;
}

function scale(value: number, scaleFactor: number | undefined): number {
  if (scaleFactor == null) {
    return value;
  }
  const formattedValue = value / 10 ** scaleFactor;
  return formattedValue;
}

function shouldFormatNumberAsHex(printf: string): boolean {
  const conversionTypeIndex = printf.length - 2;
  const conversionType = printf[conversionTypeIndex];

  return conversionType === 'X';
}

const numberAsStringRegex = /^(?:-?\d+(\.\d+)?|0[xX][0-9A-Fa-f]+)$/;

function convertToNumber(value: number | string): number {
  if (typeof value === 'number') {
    return value;
  }
  const trimmed = value.trim();

  const error = new Error(`Failed to convert "${trimmed}" to number`);

  if (!numberAsStringRegex.test(trimmed)) {
    throw error;
  }

  const isHex = trimmed.startsWith('0x') || trimmed.startsWith('0X');
  const parsed = isHex ? parseInt(trimmed, 16) : Number(trimmed);
  if (isNaN(parsed)) {
    throw error;
  }
  return parsed;
}

function formatNumberAsHex(value: number, printf: string): string {
  const unprefixed = getUnprefixedHex(value);
  const unprefixedPrepended = prependZeroes(unprefixed, printf);
  const prefixedPrepended = `0X${unprefixedPrepended}`;
  return prefixedPrepended;
}

function getUnprefixedHex(value: number): string {
  /**
   * The following step uses 2s complement method to convert negative number
   * from it's common representation (number starting with minus `-` sign)
   * into representation where it's disguised as positive (no minus `-` sign).
   * This is only required for negative numbers, but fine for positive ones too
   * (it just has no effect in case of positive numbers).
   */
  const withoutSign = value >>> 0;
  const asHex = withoutSign.toString(16).toUpperCase();
  return asHex;
}

function findMinimalHexDigitCount(printf: string): number {
  const indexOfCharToPrependWith = printf.indexOf('%') + 1;
  const charToPrependWith = printf[indexOfCharToPrependWith];

  /**
   * FYI: it's also possible that charToPrependWith is missing (e.g. `'%4X'`),
   * which would mean that hex number should be prepended with empty space `' '` char.
   * But we don't care about this case.
   */
  if (charToPrependWith !== '0') {
    return 0;
  }

  const minimalHexDigitCount = parseInt(printf.substring(indexOfCharToPrependWith, printf.length - 2), 10);
  return minimalHexDigitCount;
}

function prependZeroes(hexNumber: string, printf: string) {
  const minimalHexDigitCount = findMinimalHexDigitCount(printf);
  const withZeroesPrepended = hexNumber.padStart(minimalHexDigitCount, '0');
  return withZeroesPrepended;
}

// hasVariable
const variableRegex = /(?!\$DUMMY)\$\w+|\${\w+}/i;

function hasVariable(str: string): boolean {
  const match = str.match(variableRegex);
  return match?.[0] === str;
}

// combineWith

function combineWithOr(filter1: MetricsQueryFilter_V5, ...rest: MetricsQueryFilter_V5[]): MetricsQueryFilter_V5;
function combineWithOr(...filters: MetricsQueryFilter_V5[]): MetricsQueryFilter_V5 | 'no_filter';
function combineWithOr(...filters: FilterCombinationResult_V5[]): FilterCombinationResult_V5;
function combineWithOr(...filters: FilterCombinationResult_V5[]): FilterCombinationResult_V5 {
  return filters.reduce(combineWithOrImpl, 'no_filter');
}
function combineWithOrImpl(
  filterA: FilterCombinationResult_V5,
  filterB: FilterCombinationResult_V5
): FilterCombinationResult_V5 {
  if (filterA === 'always_true' || filterB === 'always_true') {
    return 'always_true';
  }
  if (filterA === 'no_filter') {
    return filterB;
  }
  if (filterB === 'no_filter') {
    return filterA;
  }
  if (filterA === 'always_false') {
    return filterB;
  }
  if (filterB === 'always_false') {
    return filterA;
  }

  const elementsFromFilterA = filterA.or ?? [filterA];
  const elementsFromFilterB = filterB.or ?? [filterB];

  return {
    or: [...elementsFromFilterA, ...elementsFromFilterB],
  };
}

function combineWithAnd(filter1: MetricsQueryFilter_V5, ...rest: MetricsQueryFilter_V5[]): MetricsQueryFilter_V5;
function combineWithAnd(...filters: MetricsQueryFilter_V5[]): MetricsQueryFilter_V5 | 'no_filter';
function combineWithAnd(...filters: FilterCombinationResult_V5[]): FilterCombinationResult_V5;
function combineWithAnd(...filters: FilterCombinationResult_V5[]): FilterCombinationResult_V5 {
  return filters.reduce(combineWithAndImpl, 'no_filter');
}

function combineWithAndImpl(
  filterA: FilterCombinationResult_V5,
  filterB: FilterCombinationResult_V5
): FilterCombinationResult_V5 {
  if (filterA === 'always_false' || filterB === 'always_false') {
    return 'always_false';
  }
  if (filterA === 'no_filter') {
    return filterB;
  }
  if (filterB === 'no_filter') {
    return filterA;
  }
  if (filterA === 'always_true') {
    return filterB;
  }
  if (filterB === 'always_true') {
    return filterA;
  }

  const elementsFromFilterA = filterA.and ?? [filterA];
  const elementsFromFilterB = filterB.and ?? [filterB];

  return {
    and: [...elementsFromFilterA, ...elementsFromFilterB],
  };
}

// transformFilter.ts
type FilterCombinationResult_V5 = MetricsQueryFilter_V5 | 'always_true' | 'always_false' | 'no_filter';
type ClauseTransformer = (clause: MetricsQueryFilterClause_V4) => FilterCombinationResult_V5;
type FilterTransformer = (filter: MetricsQueryFilter_V4) => FilterCombinationResult_V5;

function transformClauses(
  rootFilter: MetricsQueryFilter_V4,
  transformer: ClauseTransformer
): FilterCombinationResult_V5 {
  return transformFilter(rootFilter, (subFilter) => {
    if (subFilter.clause) {
      return transformer(subFilter.clause);
    }
    return subFilter as MetricsQueryFilter_V5;
  });
}

function transformFilter(
  rootFilter: MetricsQueryFilter_V4,
  transformer: FilterTransformer
): FilterCombinationResult_V5 {
  const transformedFilter = transformer(rootFilter);

  if (typeof transformedFilter === 'string') {
    return transformedFilter;
  }

  if (transformedFilter.or) {
    return transformedFilter.or.reduce((acc: FilterCombinationResult_V5, subFilter: MetricsQueryFilter_V4) => {
      const transformedSubFilter = transformFilter(subFilter, transformer);
      return combineWithOr(acc, transformedSubFilter);
    }, 'no_filter');
  }

  if (transformedFilter.and) {
    return transformedFilter.and.reduce((acc: FilterCombinationResult_V5, subFilter: MetricsQueryFilter_V4) => {
      const transformedSubFilter = transformFilter(subFilter, transformer);
      return combineWithAnd(acc, transformedSubFilter);
    }, 'no_filter');
  }

  return transformedFilter;
}

function filterCombinationResultToMetricFilter(
  filter: FilterCombinationResult_V5 | undefined
): MetricsQueryFilter_V5 | undefined {
  if (filter === 'always_false') {
    throw new Error('Filter is always FALSE');
  }

  if (filter === 'always_true' || filter === 'no_filter') {
    return undefined;
  }

  return filter;
}

function transformMetricsQueryFilters(
  { aggregated, nonAggregated }: MetricsQueryFilters_V4,
  transformer: ClauseTransformer
): MetricsQueryFilters_V5 {
  const processFilter = (filter: MetricsQueryFilter_V4 | undefined) => {
    const processedFilter = filter && transformClauses(filter, transformer);
    return filterCombinationResultToMetricFilter(processedFilter);
  };

  return { aggregated: processFilter(aggregated), nonAggregated: processFilter(nonAggregated) };
}
