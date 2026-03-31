import { throwIfNullish } from 'public-common';

import { variableRegex } from 'datasource/features/variables/utils';

import { createToken } from './createToken';
import { createVariable } from './matchVariable';
import { StringLiteral, Variable } from './token';
import { unescapeStringLiteral } from './unescapeStringLiteral';

export function getVariablesFromStr(str: string, startPos: number): Variable[] {
  return [...str.matchAll(new RegExp(variableRegex, 'gi'))].map((matchResult) => {
    const { index } = matchResult;
    throwIfNullish(index, 'Index property should be present');
    return createVariable(startPos + index, matchResult[0]);
  });
}

export function splitStringIntoMultipleTokens(
  source: StringLiteral,
  variables: Variable[],
  startPos: number
): Array<StringLiteral | Variable> {
  let offset = 0;
  const tokens: Array<StringLiteral | Variable> = [];
  const quote = source.tokenText[0];
  throwIfNullish(quote, 'Guaranteed to exist');

  for (const variable of variables) {
    if (variable.startIdx !== startPos + offset) {
      const partialStringLiteralFullText = source.tokenText.slice(offset, variable.startIdx - startPos);
      tokens.push({
        ...createToken('string_literal', startPos + offset, partialStringLiteralFullText),
        value: unescapeStringLiteral(partialStringLiteralFullText, quote),
        valueGroupId: source,
      });
    }

    tokens.push({ ...variable, valueGroupId: source });
    offset = variable.endIdx - startPos;
  }

  const partialStringLiteralFullText = source.tokenText.slice(offset, source.tokenText.length);
  tokens.push({
    ...createToken('string_literal', startPos + offset, partialStringLiteralFullText),
    value: unescapeStringLiteral(partialStringLiteralFullText, quote),
    valueGroupId: source,
  });

  const firstToken = tokens[0] as StringLiteral;
  tokens[0] = { ...firstToken, value: firstToken.value.slice(1) };
  const lastToken = tokens[tokens.length - 1] as StringLiteral;
  tokens[tokens.length - 1] = { ...lastToken, value: lastToken.value.slice(0, lastToken.value.length - 1) };

  return tokens;
}
