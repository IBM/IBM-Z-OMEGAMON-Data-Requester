import {
  Token,
  TokenKind,
  TokenOf,
  GenericKind,
  TokenOfGenericKind,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { AstNode } from './AstNode';
import { ParserError } from './ParserError';

export function skipUntil(tokens: Token[], targetTokenKind: TokenKind): [skippedTokens: Token[], rest: Token[]] {
  const idx = tokens.findIndex((token) => token.kind === targetTokenKind);
  if (idx === 0 || idx === -1) {
    return [[], tokens];
  }
  return [tokens.slice(0, idx), tokens.slice(idx)];
}

type KindToTokenOf<T extends TokenKind[]> = {
  [K in keyof T]: TokenOf<T[K]> | null;
};

/**
 * Matches the sequence of tokens with a tuple of specific kinds. For each kind,
 * returns either Token of this kind or null. Also returns remaining tokens.
 * @param tokens Tokens to match
 * @param kinds Specific kinds to match against
 * @returns Tuple of length N+1 where N is length of kinds
 */
export function extract<T extends TokenKind[]>(tokens: Token[], ...kinds: T): [...KindToTokenOf<T>, Token[]] {
  const matches = kinds.map((kind, idx) => {
    const token = tokens[idx];
    return tokens[idx]?.kind === kind ? token : null;
  });
  return [...(matches as KindToTokenOf<T>), tokens.slice(kinds.length)];
}

/**
 * Extracts first token from input sequence.
 * @param tokens Input sequence of tokens
 * @returns Tuple of token and rest of the tokens
 */
export function extractOne(tokens: Token[]): [Token | undefined, Token[]] {
  const [first, ...rest] = tokens;
  return [first, rest];
}

/**
 * Matches first token from input sequence against given generic kind.
 * @param tokens Input sequence of tokens
 * @param gKind Generic kind to match against
 * @returns Tuple of matched token (or null) and rest of the tokens
 */
export function extractOneByGenericKind<T extends GenericKind>(
  tokens: Token[],
  gKind: T
): [TokenOfGenericKind<T> | null, Token[]] {
  const [first, ...rest] = tokens;
  if (first?.genericKind === gKind) {
    return [first as TokenOfGenericKind<T>, rest];
  }
  return [null, tokens];
}

type BlockParseResult<T extends AstNode = AstNode> = [T | null, Token[]];
export type BlockParser<T extends AstNode = AstNode> = (tokens: Token[]) => BlockParseResult<T>;

/**
 * Runs `parser` callback on `tokens` sequence until there is `separator`
 * token after each step
 * @param tokens Input sequence of tokens
 * @param separator Token kind that is expected to separate nodes to parse
 * @param parser Parser callback
 * @returns Array of parsed AST Nodes and rest of the tokens
 */
export function parseSeparated<T extends AstNode>(
  tokens: Token[],
  separator: TokenKind,
  parser: BlockParser<T>
): [nodes: T[], rest: Token[]] {
  const [first, afterFirst] = parser(tokens);
  if (!first) {
    return [[], tokens];
  }

  let currToken = afterFirst;
  const result = [first];
  while (true) {
    const [sepToken, afterSeparator] = extract(currToken, separator);
    if (!sepToken) {
      return [result, currToken];
    }

    const [nextNode, afterNext] = parser(afterSeparator);
    if (!nextNode) {
      throw new ParserError('Unexpected tokens after the separator', [sepToken]);
    }

    result.push(nextNode);
    currToken = afterNext;
  }
}
