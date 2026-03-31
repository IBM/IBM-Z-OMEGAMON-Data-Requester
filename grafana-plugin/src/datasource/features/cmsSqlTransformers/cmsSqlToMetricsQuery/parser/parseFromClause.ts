import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { FromClause } from './AstNode';
import { extract, parseSeparated } from './common';
import { parseIdentifier } from './parseIdentifier';
import { ParserError } from './ParserError';

export function parseFromClause(
  tokens: Token[],
  ignoreIncompleteIdentifier = false
): [block: FromClause | null, rest: Token[]] {
  const [from, afterFrom] = extract(tokens, 'from_keyword');
  if (!from) {
    return [null, tokens];
  }

  const [tables, rest] = parseSeparated(afterFrom, 'comma_separator', (tokensToParse) =>
    parseIdentifier(tokensToParse, ignoreIncompleteIdentifier)
  );

  if (tables.length === 0) {
    throw new ParserError('List of attribute groups is expected after FROM keyword', [from]);
  }

  return [
    {
      nodeType: 'from',
      tables,
      keyword: from,
    },
    rest,
  ];
}
