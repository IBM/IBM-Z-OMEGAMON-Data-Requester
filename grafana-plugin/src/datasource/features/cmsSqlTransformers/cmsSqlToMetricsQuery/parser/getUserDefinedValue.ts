import { Value, StringLiteral } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { ParserError } from './ParserError';

export function getUserDefinedValue(tokens: Value[]): string | number {
  const [firstToken] = tokens;
  if (!firstToken) {
    throw new ParserError('Incorrect arguments', []);
  }

  if (startsWithStringLiteral(tokens)) {
    return buildUserDefinedStringValue(tokens);
  }

  if (tokens.length > 1) {
    throw new ParserError('Incorrect number of tokens', tokens);
  }

  if (firstToken.kind === 'decimal_literal' || firstToken.kind === 'hexadecimal_literal') {
    if (!firstToken.resolved) {
      throw new ParserError('Incorrect numeric literal value', tokens);
    }
    return firstToken.value;
  }

  if (firstToken.kind === 'variable') {
    return firstToken.tokenText;
  }

  throw new ParserError(`Unexpected token type "${firstToken.kind}"`, tokens);
}

function startsWithStringLiteral(tokens: Value[]): tokens is [StringLiteral, ...Value[]] {
  return tokens[0]?.kind === 'string_literal';
}

function buildUserDefinedStringValue(tokens: [StringLiteral, ...Value[]]): string {
  const [firstToken] = tokens;

  if (!firstToken.valueGroupId) {
    if (tokens.length > 1) {
      throw new ParserError('Incorrect number of tokens', tokens);
    }
    return firstToken.value;
  }

  return tokens.reduce((prev, curr) => {
    switch (curr.kind) {
      case 'string_literal':
        return prev + curr.value;
      case 'variable':
        return prev + curr.tokenText;
      default:
        throw new ParserError('Only string literal or variable expected', tokens);
    }
  }, '');
}
