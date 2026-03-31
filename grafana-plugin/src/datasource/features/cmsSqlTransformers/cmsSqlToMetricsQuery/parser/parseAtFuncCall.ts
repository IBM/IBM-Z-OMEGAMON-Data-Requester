import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { AtClause } from './AstNode';
import { extract } from './common';
import { parseFunctionCallArgumentList } from './parseExpression';
import { ParserError } from './ParserError';

export function parseAtFuncCall(tokens: Token[]): [block: AtClause | null, rest: Token[]] {
  const [keyword, afterKeyword] = extract(tokens, 'at_keyword');
  if (!keyword) {
    return [null, tokens];
  }

  const { args, rest } = parseFunctionCallArgumentList(afterKeyword, [keyword]);
  // TODO: We ignore AT clause in converter. Should we also ignore those errors?
  if (args.length === 0) {
    throw new ParserError('AT function requires at least one string literal argument', [keyword]);
  }
  args.forEach((arg) => {
    if (arg.nodeType !== 'value') {
      throw new ParserError('AT function arguments should be string literals', [keyword]);
    }
    arg.tokens.forEach(({ kind }) => {
      if (kind !== 'string_literal') {
        throw new ParserError('AT function arguments should be string literals', [keyword]);
      }
    });
  });

  return [{ nodeType: 'at', keyword, items: args }, rest];
}
