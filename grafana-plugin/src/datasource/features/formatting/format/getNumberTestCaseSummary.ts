import { ColumnMetadata } from 'public-domain';

export function getNumberTestCaseSummary(val: string | number, columnMd: ColumnMetadata): string {
  const scaleFactorSummary = columnMd.scaleFactor ? `scaleFactor=${columnMd.scaleFactor}` : '';
  const printfSummary = columnMd.printf ? `PRINTF="${columnMd.printf}"` : '';
  const valueFormattedForPrinting = typeof val === 'string' ? `"${val}"` : val;
  const valueSummary = `val=${valueFormattedForPrinting}`;
  return `${valueSummary} ${printfSummary} ${scaleFactorSummary}`;
}
