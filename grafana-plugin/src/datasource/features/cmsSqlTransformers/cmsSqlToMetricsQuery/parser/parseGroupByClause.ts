import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { GroupByClause } from './AstNode';
import { extract, parseSeparated } from './common';
import { parseIdentifier } from './parseIdentifier';
import { ParserError } from './ParserError';

export function parseGroupByClause(tokens: Token[]): [GroupByClause | null, Token[]] {
  const [group, by, afterGroupBy] = extract(tokens, 'group_keyword', 'by_keyword');

  if (!group) {
    return [null, tokens];
  }

  if (!by) {
    throw new ParserError('GROUP BY keyword misspelled', [group]);
  }

  const [columns, afterColumns] = parseSeparated(afterGroupBy, 'comma_separator', parseIdentifier);
  if (!columns) {
    throw new ParserError('List of identifiers is expected after GROUP BY keyword', [group, by]);
  }

  return [{ nodeType: 'group_by', columns, keywords: [group, by] }, afterColumns];
}
