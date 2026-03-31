import { Expression, Identifier } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';
import { TokenBase } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { testExports } from './convertToMetricsQueryFilter';

const { expressionToUserDefinedValue } = testExports;

describe('Test expressionToUserDefinedValue', () => {
  it('Value expression', () => {
    const expr: Expression = { nodeType: 'value', asUserDefinedValue: 5, tokens: [] };
    expect(expressionToUserDefinedValue(expr)).toBe(5);
  });

  it('Positive unary expression', () => {
    const expr: Expression = {
      nodeType: 'unary',
      operator: { kind: 'add_arithmetic_operator' } as TokenBase<'add_arithmetic_operator'>,
      childExpr: { nodeType: 'value', asUserDefinedValue: 5, tokens: [] },
    };
    expect(expressionToUserDefinedValue(expr)).toBe(5);
  });

  it('Negative unary expression', () => {
    const expr: Expression = {
      nodeType: 'unary',
      operator: { kind: 'sub_arithmetic_operator' } as TokenBase<'sub_arithmetic_operator'>,
      childExpr: { nodeType: 'value', asUserDefinedValue: 5, tokens: [] },
    };
    expect(expressionToUserDefinedValue(expr)).toBe(-5);
  });

  it('Multilevel unary expression -+5', () => {
    const expr: Expression = {
      nodeType: 'unary',
      operator: { kind: 'sub_arithmetic_operator' } as TokenBase<'sub_arithmetic_operator'>,
      childExpr: {
        nodeType: 'unary',
        childExpr: { nodeType: 'value', asUserDefinedValue: 5, tokens: [] },
        operator: { kind: 'add_arithmetic_operator' } as TokenBase<'add_arithmetic_operator'>,
      },
    };
    expect(expressionToUserDefinedValue(expr)).toBe(-5);
  });

  it('Multilevel unary expression --5', () => {
    const expr: Expression = {
      nodeType: 'unary',
      operator: { kind: 'sub_arithmetic_operator' } as TokenBase<'sub_arithmetic_operator'>,
      childExpr: {
        nodeType: 'unary',
        childExpr: { nodeType: 'value', asUserDefinedValue: 5, tokens: [] },
        operator: { kind: 'sub_arithmetic_operator' } as TokenBase<'sub_arithmetic_operator'>,
      },
    };
    expect(expressionToUserDefinedValue(expr)).toBe(5);
  });

  it('String in unary expression', () => {
    const expr: Expression = {
      nodeType: 'unary',
      operator: { kind: 'sub_arithmetic_operator' } as TokenBase<'sub_arithmetic_operator'>,
      childExpr: { nodeType: 'value', asUserDefinedValue: '5', tokens: [] },
    };
    expect(() => expressionToUserDefinedValue(expr)).toThrow();
  });

  it('Invalid node type', () => {
    expect(() => expressionToUserDefinedValue({ nodeType: 'unqualified_identifier' } as Identifier)).toThrow();
  });
});
