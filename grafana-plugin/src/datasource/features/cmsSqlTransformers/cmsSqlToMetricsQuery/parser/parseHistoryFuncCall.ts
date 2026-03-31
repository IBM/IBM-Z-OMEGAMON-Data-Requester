import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { HistoryClause } from './AstNode';
import { extract } from './common';
import { getNodesTokens } from './helpers';
import { parseFunctionCallArgumentList } from './parseExpression';
import { ParserError } from './ParserError';

export function parseHistoryFuncCall(tokens: Token[]): [HistoryClause | null, Token[]] {
  const [keyword, afterKeyword] = extract(tokens, 'history_keyword');
  if (!keyword) {
    return [null, tokens];
  }

  const { args, rest } = parseFunctionCallArgumentList(afterKeyword, [keyword]);

  if (args.length) {
    throw new ParserError("HISTORY function doesn't take any arguments", [keyword, ...getNodesTokens(args)]);
  }

  return [{ nodeType: 'history', keyword }, rest];
}
