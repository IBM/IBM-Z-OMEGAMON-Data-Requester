import { throwIfNullish } from 'public-common';

import { createToken } from './createToken';
import { matchDecimalLiteral } from './matchDecimalLiteral';
import { matchHexadecimalLiteral } from './matchHexadecimalLiteral';
import { matchKeywordOrIdentifier } from './matchKeywordOrIdentifier';
import { matchStringLiteral } from './matchStringLiteral';
import { matchSymbolic } from './matchSymbolic';
import { matchVariable } from './matchVariable';
import { matchWhitespace } from './matchWhitespace';
import { TokenMatcher, Token } from './token';

const tokenMatchers: TokenMatcher[] = [
  matchWhitespace,
  matchHexadecimalLiteral, // should be before decimal
  matchDecimalLiteral,
  matchStringLiteral,
  matchVariable,
  matchSymbolic,
  matchKeywordOrIdentifier,
];

function runMatchers(source: string, startPos: number): Token[] {
  for (const matcher of tokenMatchers) {
    const match = matcher(source, startPos);
    if (match.length) {
      return match;
    }
  }
  return [];
}

function matchTokens(source: string, startPos: number): Token[] {
  const matchedTokens = runMatchers(source, startPos);
  if (matchedTokens.length) {
    return matchedTokens;
  }

  let currPos = startPos;
  while (true) {
    currPos = currPos + 1;
    const matchAttempt = runMatchers(source, currPos);
    if (matchAttempt.length || currPos >= source.length) {
      const unexpectedText = source.substring(startPos, currPos);
      return [
        createToken('unknown', startPos, unexpectedText, [
          {
            severity: 'error',
            message: `Unexpected token '${unexpectedText}'`,
          },
        ]),
      ];
    }
  }
}

function removeWhitespaceTokens(input: Token[]): Token[] {
  return input.filter((token) => token.kind !== 'whitespace_separator');
}

export function tokenize(sourceCmsSql: string): Token[] {
  let currPos = 0;
  const resultTokens: Token[] = [];
  while (currPos < sourceCmsSql.length) {
    const matchedTokens = matchTokens(sourceCmsSql, currPos);
    resultTokens.push(...matchedTokens);
    const lastMatchedToken = matchedTokens.at(-1);
    throwIfNullish(lastMatchedToken, 'This element should always be present');
    currPos = lastMatchedToken.endIdx;
  }

  return removeWhitespaceTokens(resultTokens);
}
