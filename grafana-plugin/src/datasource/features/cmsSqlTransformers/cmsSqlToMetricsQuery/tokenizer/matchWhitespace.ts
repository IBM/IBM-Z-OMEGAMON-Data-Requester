import { createToken } from './createToken';
import { scanWhile, isWhitespace } from './scanHelpers';
import { Token } from './token';

export function matchWhitespace(source: string, startPos: number): Token[] {
  const scannedWhitespace = scanWhile(source, startPos, isWhitespace);
  return scannedWhitespace ? [createToken('whitespace_separator', startPos, scannedWhitespace)] : [];
}
