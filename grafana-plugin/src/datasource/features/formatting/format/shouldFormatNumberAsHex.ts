import { ColumnMetadata } from 'public-domain';

export function shouldFormatNumberAsHex(columnMd: ColumnMetadata): boolean {
  if (!columnMd.printf) {
    return false;
  }
  const conversionType = columnMd.printf.at(-1);

  return conversionType === 'X';
}
