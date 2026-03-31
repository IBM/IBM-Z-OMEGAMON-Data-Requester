const numberAsStringRegex = /^(?:-?\d+(\.\d+)?|0[xX][0-9A-Fa-f]+)$/;

/**
 * Either returns number or throws error, if conversion fails
 */
export function convertToNumber(value: number | string): number {
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
