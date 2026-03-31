import { Token, TokenOf } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { Expression, WhereClause, HavingClause } from './AstNode';
import { extract } from './common';
import { parseFilterExpression } from './parseExpression';
import { ParserError } from './ParserError';

function parseFilterGroup<T extends 'where' | 'having'>(
  tokens: Token[],
  clauseName: T
): [{ nodeType: T; filter: Expression; keyword: TokenOf<`${T}_keyword`> } | null, Token[]] {
  const [keyword, afterKeyword] = extract(tokens, `${clauseName}_keyword`);
  if (!keyword) {
    return [null, tokens];
  }

  const [filter, rest] = parseFilterExpression(afterKeyword);

  if (!filter) {
    throw new ParserError(`Filter expression is expected after ${clauseName.toUpperCase()} keyword`, [keyword]);
  }

  return [
    {
      nodeType: clauseName,
      filter,
      keyword,
    },
    rest,
  ];
}

export function parseWhereClause(tokens: Token[]): [WhereClause | null, Token[]] {
  return parseFilterGroup(tokens, 'where');
}

export function parseHavingClause(tokens: Token[]): [HavingClause | null, Token[]] {
  return parseFilterGroup(tokens, 'having');
}
