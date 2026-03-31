import { convertToNumberOrThrow } from './convertToNumberOrThrow';

function isValidDec(val: string): boolean {
  return /^\s*-?\d+(\.\d+)?\s*$/.test(val);
}

function isValidHex(val: string): boolean {
  return /^\s*0x[0-9a-f]+\s*$/i.test(val);
}

/**
 * @param value - hex number (
 *   without minus `-` sign, cause the `-` sign has been
 *   encoded into number itself using 2s complement method
 * )
 */
function reverseFormatHexNumber(value: string): number {
  const withoutSign = convertToNumberOrThrow(value);
  const withRestoredSign = withoutSign | 0;
  return withRestoredSign;
}

function reverseScale(value: number | string, scaleFactor?: number): number {
  const asNumber = convertToNumberOrThrow(value);
  if (scaleFactor == null) {
    return asNumber;
  }
  return asNumber * 10 ** scaleFactor;
}

/**
 * Converts number from human-readable format back to raw ITM format.
 * @param value - e.g. `"0XA"` or `"A"`, or `10`
 * @param scaleFactor - scaleFactor from column metadata
 * @returns decimal number, e.g. `10`
 *
 * Note:
 * the returned number may or may not be exactly in the same form as in ITM,
 *
 * E.g.
 * in ITM value for COLUMN_X may be `"0xA"`.
 * To successfully match it in WHERE clause, you can write any of the following:
 * 1. WHERE COLUMN_X = 0xA
 * 2. WHERE COLUMN_X = 0xa
 * 1. WHERE COLUMN_X = 10
 */
export function reverseFormatNumber(value: number | string, scaleFactor: number | undefined): number {
  if (typeof value === 'number' || isValidDec(value)) {
    return reverseScale(value, scaleFactor);
  }
  if (isValidHex(value)) {
    return reverseFormatHexNumber(value);
  }
  throw new Error(`reverseFormatNumber: Failed to convert string "${value}" to number`);
}
