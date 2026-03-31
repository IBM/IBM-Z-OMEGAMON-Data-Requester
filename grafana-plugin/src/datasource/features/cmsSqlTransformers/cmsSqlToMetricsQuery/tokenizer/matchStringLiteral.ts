import { createToken } from './createToken';
import { getVariablesFromStr, splitStringIntoMultipleTokens } from './processStringWithVariables';
import { StringLiteral, Token } from './token';
import { unescapeStringLiteral } from './unescapeStringLiteral';

export function matchStringLiteral(source: string, startPos: number): Token[] {
  const quotes = ["'", '"'];
  const startChar = source[startPos] ?? '';
  if (!quotes.includes(startChar)) {
    return [];
  }
  let currPos = startPos + 1;
  while (true) {
    if (currPos === source.length) {
      return [
        {
          ...createToken('string_literal', startPos, source.substring(startPos), [
            {
              severity: 'error',
              message: 'Unexpected end of query (unclosed string literal)',
            },
          ]),
          value: unescapeStringLiteral(source.substring(startPos + 1), startChar),
        },
      ];
    }
    if (source[currPos] !== startChar) {
      currPos += 1;
      continue;
    }
    if (source[currPos + 1] === startChar) {
      // it's escaped quote
      currPos += 2;
      continue;
    }

    const fullText = source.substring(startPos, currPos + 1);
    const value = unescapeStringLiteral(fullText.substring(1, fullText.length - 1), startChar);

    const stringLiteral: StringLiteral = {
      ...createToken('string_literal', startPos, fullText),
      value,
    };

    const variables = getVariablesFromStr(fullText, startPos);
    if (variables.length) {
      return splitStringIntoMultipleTokens(stringLiteral, variables, startPos);
    }

    return [stringLiteral];
  }
}
