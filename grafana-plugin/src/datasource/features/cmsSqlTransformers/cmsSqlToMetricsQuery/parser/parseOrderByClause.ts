import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { OrderByExpression, OrderByClause } from './AstNode';
import { extractOneByGenericKind, extract, parseSeparated } from './common';
import { parseFunctionCall } from './parseExpression';
import { parseIdentifier } from './parseIdentifier';
import { ParserError } from './ParserError';

function parseOrderByExpression(tokens: Token[]): [OrderByExpression | null, Token[]] {
  const [func, afterFunc] = parseFunctionCall(tokens);

  if (func) {
    const [direction, afterDirection] = extractOneByGenericKind(afterFunc, 'order_direction');
    if (direction) {
      return [{ nodeType: 'order_by_expression', functionCall: func, direction }, afterDirection];
    }
    return [{ nodeType: 'order_by_expression', functionCall: func, direction: null }, afterFunc];
  }

  const [identifier, afterIdentifier] = parseIdentifier(tokens);
  if (!identifier) {
    return [null, tokens];
  }

  const [direction, afterDirection] = extractOneByGenericKind(afterIdentifier, 'order_direction');
  if (direction) {
    return [{ nodeType: 'order_by_expression', identifier, direction }, afterDirection];
  }
  return [{ nodeType: 'order_by_expression', identifier, direction: null }, afterIdentifier];
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
