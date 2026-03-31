import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { OrderByExpression, OrderByClause } from './AstNode';
import { extractOneByGenericKind, extract, parseSeparated } from './common';
import { parseIdentifier } from './parseIdentifier';
import { ParserError } from './ParserError';

function parseOrderByExpression(tokens: Token[]): [OrderByExpression | null, Token[]] {
  // Can it actually be a function call?
  const [column, afterColumn] = parseIdentifier(tokens);
  if (!column) {
    return [null, tokens];
  }

  const [direction, afterDirection] = extractOneByGenericKind(afterColumn, 'order_direction');

  if (direction) {
    return [{ nodeType: 'order_by_expression', identifier: column, direction }, afterDirection];
  }
  return [{ nodeType: 'order_by_expression', identifier: column, direction: null }, afterColumn];
}

// TODO: tests
export function parseOrderByClause(tokens: Token[]): [OrderByClause | null, Token[]] {
  const [order, by, afterGroupBy] = extract(tokens, 'order_keyword', 'by_keyword');
  if (!order) {
    return [null, tokens];
  }

  if (!by) {
    throw new ParserError('ORDER BY keyword misspelled', [order]);
  }

  const [items, afterItems] = parseSeparated(afterGroupBy, 'comma_separator', parseOrderByExpression);
  if (!items) {
    throw new ParserError('Empty ORDER BY clause', [order, by]);
  }

  return [{ nodeType: 'order_by', items, keywords: [order, by] }, afterItems];
}
