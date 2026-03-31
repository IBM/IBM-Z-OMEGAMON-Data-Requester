import { TokenizerProblem, DistinguishedToken } from './token';
import { TokenKind, getGenericKind } from './tokenKind';

export function createToken<T extends TokenKind>(
  kind: T,
  startIdx: number,
  text: string,
  problem?: TokenizerProblem[]
): DistinguishedToken<T> {
  return {
    kind,
    genericKind: getGenericKind(kind),
    startIdx,
    endIdx: startIdx + text.length,
    tokenText: text,
    problems: problem ?? [],
  } as DistinguishedToken<T>;
}
