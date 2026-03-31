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

export function addColumnMetadataToFieldConfig(columnMetadata: ColumnMetadata | null, fieldToMutate: Field): void {
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

  fieldToMutate.config.displayNameFromDS = getDisplayName(fieldToMutate.name, columnMetadata.name);
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
