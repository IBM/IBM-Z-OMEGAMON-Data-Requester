import { createToken } from './createToken';
import { scanWhile, isNumeric } from './scanHelpers';
import { TokenizerProblem, Token } from './token';

export function matchDecimalLiteral(source: string, startPos: number): Token[] {
  const numString = scanWhile(source, startPos, isNumeric);
  if (!numString) {
    return [];
  }

  const value = parseInt(numString, 10);
  const resolved = isFinite(value);
  const problems: TokenizerProblem[] = [];
  if (!resolved) {
    problems.push({
      severity: 'error',
      message: 'Unresolved decimal literal',
    });
  }

  return [
    {
      ...createToken('decimal_literal', startPos, numString, problems),
      resolved,
      value,
    },
  ];
}
