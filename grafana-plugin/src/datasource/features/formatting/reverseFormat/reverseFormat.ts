import { assert } from 'public-common';
import { ColumnMetadata } from 'public-domain';

import { reverseFormatEnum } from './reverseFormatEnum';
import { reverseFormatNumber } from './reverseFormatNumber';
import { reverseFormatTimestamp } from './reverseFormatTimestamp';

/**
 * @param value - attribute value in human-readable form
 * @param columnMd - column metadata
 * @returns attribute value in raw ITM form
 */
export function reverseFormatAndApplyEnums(value: string | number | Date, columnMd: ColumnMetadata): string | number {
  if (columnMd.type === 'itmTimestamp' && value instanceof Date) {
    const itmTimestamp = reverseFormatTimestamp(value);
    return itmTimestamp;
  }
  assert(
    typeof value === 'string' || typeof value === 'number',
    'Value should be Date only when it is itmTimestamp type'
  );
  const formattedEnumKey = reverseFormatEnum(value, columnMd);
  const valueToReverseFormat = formattedEnumKey === undefined ? value : formattedEnumKey;

  if (columnMd.type === 'string' && typeof value === 'string') {
    return valueToReverseFormat;
  }
  if (columnMd.type === 'number') {
    const number = reverseFormatNumber(valueToReverseFormat, columnMd.scaleFactor);
    return number;
  }
  throw new Error(
    `Unexpected data type, value: ${valueToReverseFormat} (type: ${typeof valueToReverseFormat}), column type: ${
      columnMd.type
    }`
  );
}
