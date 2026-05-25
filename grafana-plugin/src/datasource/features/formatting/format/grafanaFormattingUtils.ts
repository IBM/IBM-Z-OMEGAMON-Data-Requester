import { Field, FieldType, MappingType, SpecialValueMatch, ValueMap, ValueMapping } from '@grafana/data';
import { ColumnMetadata, TIME_UNITS } from 'public-domain';

import { extractAggFuncFromFieldName } from 'datasource/domain';

import { countColumnDisplayName, getAggregationFunctionDisplayName } from './formatAggregationFunction';
import { shouldFormatNumberAsHex } from './shouldFormatNumberAsHex';

function getValueMappings(columnMd: ColumnMetadata | null): ValueMapping[] {
  const nullMapping: ValueMapping = {
    type: MappingType.SpecialValue,
    options: {
      match: SpecialValueMatch.Null,
      result: {
        text: 'n/a',
      },
    },
  };

  // Column not being found in table metadata is somewhat a valid case
  // It might just be a newer dashboard being used on older agents
  // So if all agents on TEMS are "old" - TEMS won't know about those "new" columns
  if (columnMd == null) {
    return [nullMapping];
  }

  if (!columnMd.enums) {
    return [nullMapping];
  }

  const valueMapping = Object.entries(columnMd.enums).reduce(
    (acc: ValueMap, [key, value]) => {
      acc.options[key] = { text: value.toString() };
      return acc;
    },
    { type: MappingType.ValueToText, options: {} }
  );

  return [nullMapping, valueMapping];
}

function getDisplayName(fieldName: string, nameFromMetadata: string): string {
  const aggregationFunction = extractAggFuncFromFieldName(fieldName);
  if (aggregationFunction == null) {
    return nameFromMetadata;
  }
  if (aggregationFunction === 'COUNT') {
    return countColumnDisplayName;
  }
  const aggregationFunctionDisplayName = getAggregationFunctionDisplayName(aggregationFunction);
  return `${aggregationFunctionDisplayName} ${nameFromMetadata}`;
}

/**
 * Generates the display name for a data field based on column metadata and query context.
 * For historical queries with labels, formats the name as "columnName {label1="value1", label2="value2"}".
 * This is consistent with how the backend handles parsedQuery.Params.History.
 *
 * @param field - The Grafana data field to generate a display name for
 * @param columnMd - Metadata about the column from the table schema
 * @param isWideTimeSeries - Whether the frame type is timeseries-wide
 * @param labelColumnMetadata - Mapping of label keys to their corresponding human-readable column names, used to display descriptive names instead of raw column IDs
 * @returns The formatted display name for the field
 */
function getFieldDisplayName(
  field: Field,
  columnMd: ColumnMetadata,
  isWideTimeSeries: boolean,
  labelColumnMetadata: Record<string, string> = {}
): string {
  // Only use label values when frame is timeseries-wide (labels are present after LongToWide conversion)
  if (isWideTimeSeries && field.labels) {
    const labelValue = Object.entries(field.labels)
      .map(([key, value]) => `${labelColumnMetadata[key] || key}="${value}"`)
      .join(', ');
    if (labelValue) {
      return columnMd?.name ? `${columnMd?.name} {${labelValue}}` : `{${labelValue}}`;
    }
  }
  return getDisplayName(field.name, columnMd.name);
}

/**
 * Adds column metadata configuration to a Grafana field, including value mappings, units, decimals, and display name.
 *
 * @param columnMetadata - The column metadata to apply to the field
 * @param fieldToMutate - The Grafana field to configure
 * @param isWideTimeSeries - Whether the frame type is timeseries-wide
 * @param labelColumnMetadata - Mapping of label keys to their corresponding human-readable column names, used to display descriptive names in field labels
 */
export function addColumnMetadataToFieldConfig(
  columnMetadata: ColumnMetadata | null,
  fieldToMutate: Field,
  isWideTimeSeries = false,
  labelColumnMetadata: Record<string, string> = {}
): void {
  if (!fieldToMutate.config) {
    fieldToMutate.config = {};
  }

  fieldToMutate.config.mappings = [...(fieldToMutate.config.mappings ?? []), ...getValueMappings(columnMetadata)];

  if (columnMetadata == null) {
    return;
  }

  if (shouldFormatNumberAsHex(columnMetadata)) {
    fieldToMutate.config.unit = 'hex0x';
  } else if (TIME_UNITS.includes(columnMetadata.unit as (typeof TIME_UNITS)[number])) {
    fieldToMutate.config.unit = columnMetadata.scaleFactor === 6 ? 's' : 'clocks';
  } else if (columnMetadata.type === 'number' && !!columnMetadata.scaleFactor) {
    fieldToMutate.config.decimals = columnMetadata.scaleFactor;
  }

  fieldToMutate.config.displayNameFromDS = getFieldDisplayName(
    fieldToMutate,
    columnMetadata,
    isWideTimeSeries,
    labelColumnMetadata
  );
  fieldToMutate.config.description = columnMetadata.description;
}

export function generateField<T extends string | number | Date | null>({
  values,
  columnMd,
}: {
  values: T[];
  columnMd: ColumnMetadata;
}): Field {
  const field: Field = {
    name: columnMd.name,
    type: getFieldTypeFromColumnMetadata(columnMd),
    config: {},
    values,
  };

  addColumnMetadataToFieldConfig(columnMd, field);

  return field;
}

export function getFieldTypeFromColumnMetadata(columnMd: ColumnMetadata): FieldType {
  switch (columnMd.type) {
    case 'number':
      return FieldType.number;
    case 'string':
      return FieldType.string;
    case 'timestamp':
      return FieldType.time;
    default:
      throw new Error(`Column type '${columnMd}' doesn't supported`);
  }
}
