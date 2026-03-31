import { assert } from 'public-common';

import { tokenize } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { Expression, AstNode } from './AstNode';
import { parseArithmeticExpression } from './parseExpression';

function removeTokenPositions<T>(obj: T): T {
  const fieldsToRemove = ['source', 'startIdx', 'endIdx'];
  if (typeof obj !== 'object') {
    return obj;
  }
  for (const propName in obj) {
    if (fieldsToRemove.includes(propName)) {
      delete obj[propName];
      continue;
    }
    const currProp = obj[propName];
    if (Array.isArray(currProp)) {
      currProp.forEach(removeTokenPositions);
    } else if (typeof currProp === 'object') {
      removeTokenPositions(currProp);
    }
  }

  return obj;
}

test('Returns null node if input is empty', () => {
  expect(parseArithmeticExpression([])).toEqual([null, []]);
});

test('Returns binary operation node for arithmetic', () => {
  const [result, rest] = parseArithmeticExpression(tokenize('3 + 2'));
  expect(rest).toEqual([]);
  expect(result).toMatchObject({
    nodeType: 'binary',
    operator: { kind: 'add_arithmetic_operator' },
    left: {
      nodeType: 'value',
      tokens: [{ kind: 'decimal_literal', value: 3 }],
    },
    right: {
      nodeType: 'value',
      tokens: [{ kind: 'decimal_literal', value: 2 }],
    },
  } as Expression);
});

test('Should take precedence into account', () => {
  const [result1] = parseArithmeticExpression(tokenize('3 + 2 * 5'));

  expect(result1).toMatchObject({
    nodeType: 'binary',
    operator: { kind: 'add_arithmetic_operator' },
    left: {
      nodeType: 'value',
      tokens: [
        {
          kind: 'decimal_literal',
          value: 3,
        },
      ],
    },
    right: {
      nodeType: 'binary',
      operator: { kind: 'mul_arithmetic_operator' },
      left: {
        nodeType: 'value',
        tokens: [
          {
            kind: 'decimal_literal',
            value: 2,
          },
        ],
      },
      right: {
        nodeType: 'value',
        tokens: [
          {
            kind: 'decimal_literal',
            value: 5,
          },
        ],
      },
    },
  } as Expression);

  const [result2] = parseArithmeticExpression(tokenize('2 * 5 + 3'));

  expect(result2).toMatchObject({
    nodeType: 'binary',
    operator: { kind: 'add_arithmetic_operator' },
    left: {
      nodeType: 'binary',
      operator: { kind: 'mul_arithmetic_operator' },
      left: {
        nodeType: 'value',
        tokens: [
          {
            kind: 'decimal_literal',
            value: 2,
          },
        ],
      },
      right: {
        nodeType: 'value',
        tokens: [
          {
            kind: 'decimal_literal',
            value: 5,
          },
        ],
      },
    },
    right: {
      nodeType: 'value',
      tokens: [
        {
          kind: 'decimal_literal',
          value: 3,
        },
      ],
    },
  } as Expression);
});

test('Grouping should not have a separate node', () => {
  const [resultNoGrouping] = parseArithmeticExpression(tokenize('2 + 2'));
  const [resultWithGrouping] = parseArithmeticExpression(tokenize('(2 + 2)'));

  expect(removeTokenPositions(resultNoGrouping)).toEqual(removeTokenPositions(resultWithGrouping));
});

test('Binary operators are left-associative', () => {
  // This expression is effectilvely '((((3) + 42) - 33) + 55)
  // Which means each 'right' part of each subexpression should be just a literal
  const [result] = parseArithmeticExpression(tokenize('3 + 42 - 33 + 55'));

  const checkSubexpression = (expr: Expression) => {
    if (expr.nodeType !== 'binary') {
      return;
    }
    expect(expr.right).toMatchObject({ nodeType: 'value' });
    checkSubexpression(expr.left);
  };
  assert(result);
  checkSubexpression(result);
  expect.assertions(3);
});

test('Grouping allows break left-associative', () => {
  // 'left' part of each subexpression should be just a literal
  const [result] = parseArithmeticExpression(tokenize('(3 + (42 - (33 + (55))))'));

  const checkSubexpression = (expr: Expression) => {
    if (expr.nodeType !== 'binary') {
      return;
    }
    expect(expr.left).toMatchObject({ nodeType: 'value' });
    checkSubexpression(expr.right);
  };
  assert(result);
  checkSubexpression(result);
  expect.assertions(3);
});

test('Unary stacking', () => {
  const [result, rest] = parseArithmeticExpression(tokenize('+-+-2'));

  expect(rest).toEqual([]);
  expect(result).toMatchObject({
    nodeType: 'unary',
    operator: {
      kind: 'add_arithmetic_operator',
    },
    childExpr: {
      nodeType: 'unary',
      operator: {
        kind: 'sub_arithmetic_operator',
      },
      childExpr: {
        nodeType: 'unary',
        operator: {
          kind: 'add_arithmetic_operator',
        },
        childExpr: {
          nodeType: 'unary',
          operator: {
            kind: 'sub_arithmetic_operator',
          },
          childExpr: {
            nodeType: 'value',
            tokens: [
              {
                kind: 'decimal_literal',
                value: 2,
              },
            ],
          },
        },
      },
    },
  } as AstNode);
});

test('Throws if second operand of binary is missing', () => {
  expect(() => {
    parseArithmeticExpression(tokenize('2 +'));
  }).toThrowError();

  expect(() => {
    parseArithmeticExpression(tokenize('2 + ORDER BY'));
  }).toThrowError();
});

test('Throws if unary operand is missing', () => {
  expect(() => {
    parseArithmeticExpression(tokenize('2 + -'));
  }).toThrowError();

  expect(() => {
    parseArithmeticExpression(tokenize('2 + ORDER BY'));
  }).toThrowError();
});
