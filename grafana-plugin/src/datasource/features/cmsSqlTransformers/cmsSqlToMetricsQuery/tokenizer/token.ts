import { TokenKind, GenericKind } from './tokenKind';

export type TokenizerProblemSeverity = 'warning' | 'error';

export interface TokenizerProblem {
  severity: TokenizerProblemSeverity;
  message: string;
}

// for internal (in tokenizer) use only
export interface TokenBase<T extends TokenKind> {
  kind: T;
  genericKind: GenericKind<T>;
  startIdx: number;
  endIdx: number;
  tokenText: string;
  problems: TokenizerProblem[];
}

// we need to use conditional types here to force TS distinguish different kinds
// Token<'a' | 'b'> !== Token<'a'> | Token<'b'>
export type DistinguishedToken<T extends TokenKind> = T extends string ? TokenBase<T> : never;

export interface StringLiteral extends TokenBase<'string_literal'> {
  value: string;
  valueGroupId?: StringLiteral;
}

export interface ResolvedDecimalLiteral extends TokenBase<'decimal_literal'> {
  resolved: true;
  value: number;
}

export interface UnresolvedDecimalLiteral extends TokenBase<'decimal_literal'> {
  resolved: false;
}

export interface ResolvedHexadecimalLiteral extends TokenBase<'hexadecimal_literal'> {
  resolved: true;
  value: number;
}

export interface UnresolvedHexadecimalLiteral extends TokenBase<'hexadecimal_literal'> {
  resolved: false;
}

export interface Variable extends TokenBase<'variable'> {
  varName: string;
  valueGroupId?: StringLiteral;
}

export type Literal =
  | StringLiteral
  | ResolvedDecimalLiteral
  | UnresolvedDecimalLiteral
  | ResolvedHexadecimalLiteral
  | UnresolvedHexadecimalLiteral;

export type Value = Literal | Variable;

export function isValueToken(token: Token): token is Value {
  return token.genericKind === 'literal' || token.genericKind === 'variable';
}

export function isValueGroupToken(token: Token): token is StringLiteral | Variable {
  return token.kind === 'string_literal' || token.kind === 'variable';
}

// tokens with additional data attached. Only literals (for now?)
type SpecialToken = Value;
// all tokens other than 'special'.
type BasicTokenKind = Exclude<TokenKind, SpecialToken['kind']>;

export type Token = DistinguishedToken<BasicTokenKind> | SpecialToken;
export type TokenOf<T extends TokenKind> = Token & { kind: T };
export type TokenOfGenericKind<T extends GenericKind> = Token & {
  genericKind: T;
};

export type TokenMatcher = (source: string, currentPos: number) => Token[];
