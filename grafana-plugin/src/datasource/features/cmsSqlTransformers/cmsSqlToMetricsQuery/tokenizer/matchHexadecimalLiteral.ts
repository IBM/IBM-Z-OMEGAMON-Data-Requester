import { createToken } from './createToken';
import { scanConstant, scanWhile, isHexadecimalDigit } from './scanHelpers';
import { TokenizerProblem, Token } from './token';

export function matchHexadecimalLiteral(source: string, startPos: number): Token[] {
  const prefixString = scanConstant(source, startPos, '0x');
  if (!prefixString) {
    return [];
  }

  const problems: TokenizerProblem[] = [];

  const numString = scanWhile(source, startPos + 2, isHexadecimalDigit);

  if (![2, 4, 8].includes(numString.length)) {
    problems.push({
      severity: 'warning',
      message: 'Hexadecimal literal should be the size of 2, 4 or 8 characters',
    });
  }

  const value = parseInt(numString, 16);
  const resolved = isFinite(value);
  if (!resolved) {
    problems.push({
      severity: 'error',
      message: 'Unresolved hexadecimal literal',
    });
  }

  const token = {
    ...createToken('hexadecimal_literal', startPos, prefixString + numString),
    resolved,
    value,
    problems,
  };

  return [token];
}
