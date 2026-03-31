import { variableRegex } from 'datasource/features/variables/utils';

import { createToken } from './createToken';
import { Token, Variable } from './token';

export function createVariable(startPos: number, varString: string): Variable {
  const token = createToken('variable', startPos, varString);
  return varString.startsWith('${')
    ? { ...token, varName: varString.slice(2, varString.length - 1) }
    : { ...token, varName: varString.slice(1) };
}

export function matchVariable(source: string, startPos: number): Token[] {
  const scanString = source.substring(startPos);
  if (!scanString.startsWith('$')) {
    return [];
  }
  const match = scanString.match(variableRegex);
  if (match == null || match.index !== 0) {
    return [];
  }

  return [createVariable(startPos, match[0])];
}
