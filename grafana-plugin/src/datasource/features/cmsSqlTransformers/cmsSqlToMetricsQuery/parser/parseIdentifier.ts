import { Token, KEYWORD_LIKE_KINDS } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { Identifier } from './AstNode';
import { extract, extractOne } from './common';
import { ParserError } from './ParserError';

// Parses both qualified and unqualified identifiers
export function parseIdentifier(
  tokens: Token[],
  ignoreIncomplete = false
): [identifier: Identifier | null, tokensLeft: Token[]] {
  const [first, afterFirst] = extract(tokens, 'identifier');
  if (!first) {
    return [null, tokens];
  }

  const [separator, afterseparator] = extract(afterFirst, 'dot_separator');
  if (!separator) {
    return [{ nodeType: 'unqualified_identifier', token: first }, afterFirst];
  }

  const [second, afterSecond] = extract(afterseparator, 'identifier');

  if (second) {
    return [
      {
        nodeType: 'qualified_identifier',
        left: first,
        right: second,
      },
      afterSecond,
    ];
  }

  const [secondAsKeyword, afterSecondAsKeyword] = extractOne(afterseparator);
  if (secondAsKeyword && KEYWORD_LIKE_KINDS.includes(secondAsKeyword.kind)) {
    const secondAsIdentifier = { ...secondAsKeyword, kind: 'identifier', genericKind: 'identifier' } as const;
    return [
      {
        nodeType: 'qualified_identifier',
        left: first,
        right: secondAsIdentifier,
      },
      afterSecondAsKeyword,
    ];
  }
  if (ignoreIncomplete) {
    return [{ nodeType: 'unqualified_identifier', token: first }, afterFirst];
  }

  throw new ParserError('Qualified identifier missing identifier after the dot', [first, separator]);
}
