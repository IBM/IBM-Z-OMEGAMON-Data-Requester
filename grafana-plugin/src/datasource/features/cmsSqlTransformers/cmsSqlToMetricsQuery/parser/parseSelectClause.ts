import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { SelectItem, SelectClause } from './AstNode';
import { extract, parseSeparated } from './common';
import { parseFunctionCall } from './parseExpression';
import { parseIdentifier } from './parseIdentifier';
import { ParserError } from './ParserError';

export function parseSelectItem(tokens: Token[]): [items: SelectItem | null, rest: Token[]] {
  const [func, afterFunc] = parseFunctionCall(tokens);
  if (func) {
    return [func, afterFunc];
  }
  return parseIdentifier(tokens);
}

export function parseSelectClause(tokens: Token[]): [block: SelectClause | null, rest: Token[]] {
  const [select, afterSelect] = extract(tokens, 'select_keyword');
  if (!select) {
    return [null, tokens];
  }

  const [items, rest] = parseSeparated(afterSelect, 'comma_separator', parseSelectItem);

  if (items.length === 0) {
    throw new ParserError('Select statement misses identifiers to select', [select]);
  }

  return [
    {
      nodeType: 'select',
      items,
      keyword: select,
    },
    rest,
  ];
}
