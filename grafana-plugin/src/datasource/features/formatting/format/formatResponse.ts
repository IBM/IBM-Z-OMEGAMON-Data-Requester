import { Field, DataQueryResponse, DataFrame, FieldType } from '@grafana/data';
import { throwIfNullish } from 'public-common';
import { ColumnMetadata, TableMetadata, WRITETIME_COLUMN_ID, writetimeColumnMetadata } from 'public-domain';

import { extractColumnIdFromFieldName, FalconMetricsQuery } from 'datasource/domain';

import { applyBaseFormatting } from './format';
import { addColumnMetadataToFieldConfig } from './grafanaFormattingUtils';
import { isTimeColumn } from './isTimeColumn';

/**
 * Creates a mapping from field label keys to their human-readable column names.
 * Only includes labels that have corresponding columns in the table metadata.
 *
 * @param fieldLabels - The labels from the field (may be undefined)
 * @param tableColumns - The column metadata map from the table
 * @returns A map of label keys to their corresponding column names
 */
function buildLabelToColumnNameMap(
  fieldLabels: Record<string, string | number> | undefined,
  tableColumns: Record<string, ColumnMetadata>
): Record<string, string> {
  if (!fieldLabels) {
    return {};
  }

  return Object.keys(fieldLabels).reduce<Record<string, string>>((acc, key) => {
    const columnName = tableColumns[key]?.name;
    if (columnName) {
      acc[key] = columnName;
    }
    return acc;
  }, {});
}

/**
 * Formats a field by applying column metadata, value mappings, and appropriate data types.
 *
 * @param fieldToMutate - The Grafana field to format
 * @param columnMd - The column metadata for the field
 * @param isWideTimeSeries - Whether the frame type is timeseries-wide
 * @param labelColumnMetadata - Mapping of label keys to their corresponding human-readable column names
 */
function formatField(
  fieldToMutate: Field,
  columnMd: ColumnMetadata | null,
  isWideTimeSeries: boolean,
  labelColumnMetadata: Record<string, string> = {},
  isTimeSeries = false
): void {
  addColumnMetadataToFieldConfig(columnMd, fieldToMutate, isWideTimeSeries, labelColumnMetadata);
  if (columnMd != null) {
    const notEmptyValue = fieldToMutate.values.find((val) => val !== null && val !== undefined);
    if (notEmptyValue && isTimeColumn(columnMd.type, notEmptyValue)) {
      fieldToMutate.type = FieldType.time;
    }

    fieldToMutate.values = fieldToMutate.values.map((val) => {
      if (fieldToMutate.type === FieldType.time) {
        return new Date(val).getTime();
      }
      if (isTimeSeries) {
        return val;
      }
      return applyBaseFormatting(val, columnMd);
    });
  }
}

/**
 * CAUTION - bad code practice ahead!
 * Mutating existing response, cause in this case it should:
 * 1) probably cause no problems
 * 2) help with performance
 * 3) help reduce code complexity
 */
export function formatMetricsInResponse(
  responseToMutate: DataQueryResponse,
  tableMds: TableMetadata[],
  metricsQueries: FalconMetricsQuery[],
  isTimeSeries = false
): void {
  (responseToMutate.data as DataFrame[]).forEach((frameToMutate, idx) => {
    if (frameToMutate.name === 'situations') {
      return;
    }
    const frameName = frameToMutate.name;
    throwIfNullish(frameName, `Expected frame name to be defined for response frame at index '${idx}'`);

    const tableMd = tableMds.find((tMd) => tMd.id === frameName);
    throwIfNullish(tableMd, `Not found table metadata for table id '${frameName}'`);

    frameToMutate.fields.forEach((fieldToMutate) => {
      const columnId = extractColumnIdFromFieldName(fieldToMutate.name);
      const columnMd = columnId === WRITETIME_COLUMN_ID ? writetimeColumnMetadata : tableMd.columns[columnId];
      const labelColumnMetadata = buildLabelToColumnNameMap(fieldToMutate.labels, tableMd.columns);
      formatField(fieldToMutate, columnMd ?? null, isTimeSeries, labelColumnMetadata, isTimeSeries);
    });
  });
}
