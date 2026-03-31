import { TokenKindsFromTokenMap, ConvertToTokenMap } from './utilityTypes';

export const SYMBOLIC_TOKENS = {
  comparison_operator: {
    // like is handled as a keyword
    eq: '=',
    ne: '<>',
    le: '<=',
    lt: '<',
    ge: '>=',
    gt: '>',
  },
  arithmetic_operator: {
    add: '+',
    sub: '-',
    mul: '*',
    div: '/',
  },
  separator: {
    comma: ',',
    dot: '.',
    // whitespace has a special token matcher
    statement: ';',
  },
  parenthesis: {
    open: '(',
    close: ')',
    // CMS SQL also uses { } for grouping but in the context unknown to me ("path
    // specification")
  },
} as const;

// Keywords are identifier-like tokens. Because of that, those are matched
// as part of identifier matching.
export const KEYWORD_LIKE_TOKENS = {
  // 'at' and 'history' are not quite the keywords, but still
  keyword: ['select', 'from', 'where', 'having', 'group', 'order', 'by', 'at', 'history'],
  comparison_operator: ['like'],
  condition_connector: ['and', 'or'],
  order_direction: ['asc', 'desc'],
} as const;

// Converts KEYWORD_LIKE_TOKENS into map 'select' -> 'select_keyword', etc
function buildReverseKeywordLikeMap(): Record<string, KeywordLikeTokenKind> {
  const asEntries = Object.entries(KEYWORD_LIKE_TOKENS)
    .map(([genericKind, patterns]) => patterns.map((pattern) => [pattern.toLowerCase(), `${pattern}_${genericKind}`]))
    .flat();
  return Object.fromEntries(asEntries);
}

export const REVERSE_KEYWORD_LIKE_MAP = buildReverseKeywordLikeMap();

// Type widening is intended in order to simplify code using these arrays
export const KEYWORD_LIKE_KINDS: readonly string[] = Object.values(REVERSE_KEYWORD_LIKE_MAP);

export const KNOWN_CMS_SQL_KEYWORDS: readonly string[] = Object.values(KEYWORD_LIKE_TOKENS).flat();

export type SymbolicTokenKind = TokenKindsFromTokenMap<typeof SYMBOLIC_TOKENS>;

export type KeywordLikeTokenKind = TokenKindsFromTokenMap<ConvertToTokenMap<typeof KEYWORD_LIKE_TOKENS>>;

type LiteralTokenKind = 'string_literal' | 'decimal_literal' | 'hexadecimal_literal';

export type TokenKind =
  | SymbolicTokenKind
  | KeywordLikeTokenKind
  | LiteralTokenKind
  | 'variable'
  | 'identifier'
  | 'whitespace_separator'
  // | 'eof'
  | 'unknown';

export type GenericKind<T extends TokenKind = TokenKind> = T extends `${string}_${infer GK}` ? GK : T;

export function getGenericKind<T extends TokenKind>(kind: T): GenericKind<T> {
  return kind.substring(kind.indexOf('_') + 1) as GenericKind<T>;
}
