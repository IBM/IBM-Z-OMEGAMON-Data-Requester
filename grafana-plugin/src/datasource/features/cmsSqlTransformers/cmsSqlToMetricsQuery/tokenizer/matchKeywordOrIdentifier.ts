import { createToken } from './createToken';
import { isAlpha, scanWhile, isAlphaNumUnderscore } from './scanHelpers';
import { Token } from './token';
import { REVERSE_KEYWORD_LIKE_MAP } from './tokenKind';

export function matchKeywordOrIdentifier(source: string, startPos: number): Token[] {
  if (!isAlpha(source[startPos] ?? '')) {
    return [];
  }

  const match = scanWhile(source, startPos, isAlphaNumUnderscore);
  const matchInLowerCase = match.toLowerCase();
  const kind = REVERSE_KEYWORD_LIKE_MAP[matchInLowerCase] ?? 'identifier';

  return [createToken(kind, startPos, match)];
}
