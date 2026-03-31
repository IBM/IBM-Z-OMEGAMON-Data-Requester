import { ColumnMetadata } from 'public-domain';

import { convertToNumber } from './convertToNumber';

function scale(value: number, scaleFactor: number | undefined): number {
  if (scaleFactor == null) {
    return value;
  }
  const formattedValue = value / 10 ** scaleFactor;
  return formattedValue;
}

/**
 * Formats number according to PRINTF and scaleFactor in supplied column metadata
 * @param value - decimal number or hex number (e.g. `10` or `"0XA"` or `"A"`)
 * @returns decimal number (as number) or hex number (as string)
 */
export function formatNumber(value: number | string, columnMd: ColumnMetadata): string | number {
  const asNumber = convertToNumber(value);
  return scale(asNumber, columnMd.scaleFactor);
}
