import {
  Token,
  TokenOf,
  TokenKind,
  GenericKind,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { Expression, FunctionCall, UnaryExpression, BinaryExpression } from './AstNode';
import { BlockParser, extract, parseSeparated } from './common';
import { getNodeTokens } from './helpers';
import { parseIdentifier } from './parseIdentifier';
import { ParserError } from './ParserError';
import { parseValue } from './parseValue';

function parseExpressionPrimitive(
  tokens: Token[],
  highLevelParser: BlockParser<Expression>
): [expr: Expression | null, rest: Token[]] {
  const [groupStart, exprStart] = extract(tokens, 'open_parenthesis');
  if (groupStart) {
    const [childExpression, afterExpr] = highLevelParser(exprStart);
    const [groupEnd, rest] = extract(afterExpr, 'close_parenthesis');

    if (!groupEnd) {
      const nextToken = afterExpr[0];
      const tokensToReport = nextToken ? [nextToken] : getNodeTokens(childExpression);
      throw new ParserError('Closing parenthesis is expected', tokensToReport);
    }

    // child Expression can be empty here
    // TODO: Write tests
    return [childExpression, rest];
  }

  {
    const [functionCall, rest] = parseFunctionCall(tokens);
    if (functionCall) {
      return [functionCall, rest];
    }
  }

  {
    const [identifier, rest] = parseIdentifier(tokens);
    if (identifier) {
      return [identifier, rest];
    }
  }

  return parseValue(tokens);
}

type FunctionCallArgumentList = {
  args: Expression[];
  rest: Token[];
  openParenthesis: TokenOf<'open_parenthesis'>;
  closeParenthesis: TokenOf<'close_parenthesis'>;
};

export function parseFunctionCallArgumentList(tokens: Token[], functionIdTokens: Token[]): FunctionCallArgumentList {
  const [openParenthesis, argumentsStart] = extract(tokens, 'open_parenthesis');
  if (!openParenthesis) {
    throw new ParserError('Function call requires parentheses', functionIdTokens);
  }

  const [args, afterArgs] = parseSeparated(argumentsStart, 'comma_separator', parseArithmeticExpression);
  const [closeParenthesis, rest] = extract(afterArgs, 'close_parenthesis');
  if (!closeParenthesis) {
    throw new ParserError('Function call is not closed with parenthesis', functionIdTokens);
  }

  return {
    args,
    openParenthesis,
    closeParenthesis,
    rest,
  };
}

export function parseFunctionCall(tokens: Token[]): [funcCall: FunctionCall | null, rest: Token[]] {
  const [funcIdentifier, afterIdentifier] = parseIdentifier(tokens);
  if (!funcIdentifier) {
    return [null, tokens];
  }

  if (afterIdentifier[0]?.kind !== 'open_parenthesis') {
    return [null, tokens];
  }

  const { args, openParenthesis, closeParenthesis, rest } = parseFunctionCallArgumentList(
    afterIdentifier,
    getNodeTokens(funcIdentifier)
  );

  return [
    {
      nodeType: 'function_call',
      funcIdentifier,
      args,
      openParenthesis,
      closeParenthesis,
    },
    rest,
  ];
}

function parseUnary(
  tokens: Token[],
  highLevelParser: BlockParser<Expression>
): [expr: Expression | null, rest: Token[]] {
  const unary_operators: TokenKind[] = ['add_arithmetic_operator', 'sub_arithmetic_operator'];

  const [firstToken, ...afterOperator] = tokens;

  if (firstToken && unary_operators.includes(firstToken.kind)) {
    const [childExpr, rest] = parseUnary(afterOperator, highLevelParser);
    if (!childExpr) {
      throw new ParserError(`Unexpected unary token '${firstToken}'`, [firstToken]);
    }
    return [
      {
        nodeType: 'unary',
        operator: firstToken as UnaryExpression['operator'],
        childExpr: childExpr,
      },
      rest,
    ];
  }
  return parseExpressionPrimitive(tokens, highLevelParser);
}

interface PrecedenceMapItem {
  genericKinds?: GenericKind[];
  kinds?: TokenKind[];
}
// NOTE: It's in REVERSE precedence order
const BINARY_OPERATOR_DEFINITIONS: PrecedenceMapItem[] = [
  {
    kinds: ['or_condition_connector'],
  },
  {
    kinds: ['and_condition_connector'],
  },
  {
    genericKinds: ['comparison_operator'],
  },
  {
    kinds: ['add_arithmetic_operator', 'sub_arithmetic_operator'],
  },
  {
    kinds: ['mul_arithmetic_operator', 'div_arithmetic_operator'],
  },
];
const ARITHMETIC_START = 3;
const LOGIC_START = 0;

function matchOperator(token: Token | null, { genericKinds, kinds }: PrecedenceMapItem): boolean {
  if (genericKinds) {
    // @ts-expect-error includes doesn't expect undefined but it's OK
    return genericKinds.includes(token?.genericKind);
  }
  if (kinds) {
    // @ts-expect-error includes doesn't expect undefined but it's OK
    return kinds.includes(token?.kind);
  }
  // Should never happen
  throw new ParserError('Unexpected binary operator type', []);
}

function parseBinary(
  tokens: Token[],
  reversePrecedence: number,
  highLevelParser: BlockParser<Expression>
): [expr: Expression | null, rest: Token[]] {
  const operatorDef = BINARY_OPERATOR_DEFINITIONS[reversePrecedence];
  if (!operatorDef) {
    return parseUnary(tokens, highLevelParser);
  }

  const [leftMost, afterLeftMost] = parseBinary(tokens, reversePrecedence + 1, highLevelParser);
  if (!leftMost) {
    return [null, tokens];
  }

  // All binary operators in SQL are left-associative.
  // parsedExpression contains currently parsed binary expression which will be
  // a left part of next parsed expression
  // For example, in expression '3 + 42 - 33' parsed expression will be:
  // firstly, just (3)
  // then, ((3) + 42)
  // finally, (((3) + 42) - 33)
  let parsedExpression = leftMost;
  let afterParsedExpression = afterLeftMost;

  while (true) {
    const [operator = null, ...afterOperator] = afterParsedExpression;
    if (!matchOperator(operator, operatorDef)) {
      return [parsedExpression, afterParsedExpression];
    }

    if (!operator) {
      // Cannot happen since matchOperator returns false for nulls
      throw new ParserError('Internal parsing error: cannot handle operator token', []);
    }
    const [right, afterRight] = parseBinary(afterOperator, reversePrecedence + 1, highLevelParser);

    if (!right) {
      throw new ParserError(`Expression is expected after '${operator.tokenText}' token`, [
        ...getNodeTokens(parsedExpression),
        operator,
      ]);
    }

    parsedExpression = {
      nodeType: 'binary',
      left: parsedExpression,
      right,
      operator: operator as BinaryExpression['operator'],
    };
    afterParsedExpression = afterRight;
  }
}

export function parseArithmeticExpression(tokens: Token[]): [expr: Expression | null, rest: Token[]] {
  return parseBinary(tokens, ARITHMETIC_START, parseArithmeticExpression);
}

export function parseFilterExpression(tokens: Token[]): [expr: Expression | null, rest: Token[]] {
  return parseBinary(tokens, LOGIC_START, parseFilterExpression);
}
