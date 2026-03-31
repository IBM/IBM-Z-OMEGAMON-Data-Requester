import { Field, createTheme, getDisplayProcessor } from '@grafana/data';
import { config } from '@grafana/runtime';
import { ColumnMetadata } from 'public-domain';

import { formatNumber } from './formatNumber';
import { generateField } from './grafanaFormattingUtils';

/**
 * @param value - value of attribute, as received from ITM
 * @param columnMd - column metadata.
 */
export function applyBaseFormatting(value: string | number | null, columnMd: ColumnMetadata): string | number | null {
  if (value == null) {
    return null;
  }
  if (columnMd.type === 'number') {
    const formattedNumber = formatNumber(value, columnMd);
    return formattedNumber;
  }
  return value;
}

export function applyGrafanaFormatting(value: string | number | null, field: Field): string {
  const processor = getDisplayProcessor({ field, theme: config?.theme2 ?? createTheme() });
  const processedValue = processor(value);
  return processedValue.text;
}

export function applyAllFormatting(value: string | number | null, columnMd: ColumnMetadata): string {
  const field: Field = generateField({ values: [value], columnMd });
  const baseFormattedValue = applyBaseFormatting(value, columnMd);
  // Grafana formatting is only applied for display of these units, since we dont have reverse formatting for them.
  // Might be implemented later on OMUI5-502
  if (field.config.unit === 's' || field.config.unit === 'clocks') {
    return `${baseFormattedValue}`;
  }
  return applyGrafanaFormatting(baseFormattedValue, field);
}
