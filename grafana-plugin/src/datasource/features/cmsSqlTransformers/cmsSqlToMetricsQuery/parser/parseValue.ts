import {
  isValueGroupToken,
  StringLiteral,
  Variable,
  Token,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { Expression } from './AstNode';
import { getUserDefinedValue } from './getUserDefinedValue';

export function parseValue(tokens: Token[]): [expr: Expression | null, rest: Token[]] {
  if (tokens[0] == null) {
    return [null, tokens];
  }
  if (tokens[0].kind === 'string_literal' && tokens[0].valueGroupId) {
    let splitTokensCount = 0;
    const { valueGroupId } = tokens[0];
    for (const token of tokens) {
      if (!isValueGroupToken(token) || token.valueGroupId !== valueGroupId) {
        break;
      }
      splitTokensCount++;
    }

    const splitTokens = tokens.slice(0, splitTokensCount) as Array<StringLiteral | Variable>;
    const rest = tokens.slice(splitTokensCount);

    return [
      {
        nodeType: 'value',
        tokens: splitTokens,
        asUserDefinedValue: getUserDefinedValue(splitTokens),
      },
      rest,
    ];
  }

  const [maybeLiteral, ...rest] = tokens;
  if (maybeLiteral && (maybeLiteral.genericKind === 'literal' || maybeLiteral.genericKind === 'variable')) {
    return [
      {
        nodeType: 'value',
        tokens: [maybeLiteral],
        asUserDefinedValue: getUserDefinedValue([maybeLiteral]),
      },
      rest,
    ];
  }

  return [null, tokens];
}
