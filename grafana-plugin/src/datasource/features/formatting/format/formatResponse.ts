import { Field, DataQueryResponse, DataFrame, FieldType } from '@grafana/data';
import { throwIfNullish } from 'public-common';
import { ColumnMetadata, TableMetadata, WRITETIME_COLUMN_ID, writetimeColumnMetadata } from 'public-domain';

import { extractColumnIdFromFieldName } from 'datasource/domain';

import { applyBaseFormatting } from './format';
import { addColumnMetadataToFieldConfig } from './grafanaFormattingUtils';
import { isTimeColumn } from './isTimeColumn';

function formatField(fieldToMutate: Field, columnMd: ColumnMetadata | null): void {
  addColumnMetadataToFieldConfig(columnMd, fieldToMutate);
  if (columnMd != null) {
    const notEmptyValue = fieldToMutate.values.find((val) => val !== null && val !== undefined);
    if (notEmptyValue && isTimeColumn(columnMd.type, notEmptyValue)) {
      fieldToMutate.type = FieldType.time;
    }

    fieldToMutate.values = fieldToMutate.values.map((val) => {
      if (fieldToMutate.type === FieldType.time) {
        return new Date(val).getTime();
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
export function formatMetricsInResponse(responseToMutate: DataQueryResponse, tableMds: TableMetadata[]): void {
  (responseToMutate.data as DataFrame[]).forEach((frameToMutate, idx) => {
    if (frameToMutate.name === 'situations') {
      return;
    }
    const tableMd = tableMds.find((tMd) => tMd.id === frameToMutate.name);
    throwIfNullish(tableMd, `Not found table metadata for table id '${frameToMutate.name}'`);

    frameToMutate.fields.forEach((fieldToMutate) => {
      const columnId = extractColumnIdFromFieldName(fieldToMutate.name);
      const columnMd = columnId === WRITETIME_COLUMN_ID ? writetimeColumnMetadata : tableMd.columns[columnId];
      formatField(fieldToMutate, columnMd ?? null);
    });
  });
}
