import { ColumnMetadata } from 'public-domain';

import { convertToNumberOrThrow } from './convertToNumberOrThrow';

/**
 * Returns according enum key, if provided value is matched to any enum value.
 *
 * E.g.
 * value = 'UNKNOWN'
 * enums = { '0000': 'UNKNOWN', '0001': 'BAD_GATEWAY' }
 * result = 0
 */
export function reverseFormatEnum(
  value: string | number,
  { enums, type }: ColumnMetadata
): number | string | undefined {
  if (!enums) {
    return undefined;
  }
  for (const key in enums) {
    if (enums[key] === value || enums[key] === Number(value)) {
      if (type === 'number') {
        return convertToNumberOrThrow(key);
      }
      return key;
    }
  }
  return undefined;
}
