import { Token, TokenKind, GenericKind } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { parseIdentifier } from './parseIdentifier';

type FakeToken = { kind: TokenKind; genericKind?: GenericKind };
type FakeTokenList = FakeToken[];

test('Returns null if first token is not an identifier', () => {
  const input: FakeTokenList = [
    { kind: 'add_arithmetic_operator' },
    { kind: 'identifier' },
    { kind: 'and_condition_connector' },
  ];
  const [identifier, rest] = parseIdentifier(input as Token[]);
  expect(identifier).toBe(null);
  expect(rest).toEqual(input);
});

test('Returns unqualified identifier if matched correctly', () => {
  const input: FakeTokenList = [
    { kind: 'identifier' },
    { kind: 'add_arithmetic_operator' },
    { kind: 'decimal_literal' },
  ];
  const [identifier, rest] = parseIdentifier(input as Token[]);
  expect(identifier).toEqual({
    nodeType: 'unqualified_identifier',
    token: input[0],
  });
  expect(rest).toEqual(input.slice(1));
});

test('Returns qualified identifier if it matches', () => {
  const input: FakeTokenList = [{ kind: 'identifier' }, { kind: 'dot_separator' }, { kind: 'identifier' }];
  const [identifier, rest] = parseIdentifier(input as Token[]);
  expect(identifier).toEqual({
    nodeType: 'qualified_identifier',
    left: input[0],
    right: input[2],
  });
  expect(rest).toEqual([]);
});

test('Returns qualified identifier when input is keyword', () => {
  const commonInput: FakeTokenList = [{ kind: 'identifier' }, { kind: 'dot_separator' }];
  // OMUI5-386 Add support for keywords as qualified identifiers
  // Example: SELECT DSNZPARM.DESC FROM KDP.DSNZPARM
  const keywordInputArray: FakeToken[] = [
    { kind: 'select_keyword' },
    { kind: 'like_comparison_operator' },
    { kind: 'and_condition_connector' },
    { kind: 'asc_order_direction' },
  ];

  for (const keywordInput of keywordInputArray) {
    const input = [...commonInput, keywordInput];
    const outputRight: FakeToken = { kind: 'identifier', genericKind: 'identifier' };

    const [identifier, rest] = parseIdentifier(input as Token[]);
    expect(identifier).toEqual({
      nodeType: 'qualified_identifier',
      left: input[0],
      right: outputRight,
    });
    expect(rest).toEqual([]);
  }
});

test('Qualified identifier with genericKind not of keywordGenericKindArray leads to exception', () => {
  const input: FakeTokenList = [{ kind: 'identifier' }, { kind: 'dot_separator' }, { kind: 'add_arithmetic_operator' }];

  expect(() => parseIdentifier(input as Token[])).toThrowError();
});

test('Incomplete qualified identifier leads to exception', () => {
  const input: FakeTokenList = [
    { kind: 'identifier' },
    { kind: 'dot_separator' },
    // { kind: 'identifier' }, <-- This token here is expected to be
  ];

  expect(() => parseIdentifier(input as Token[])).toThrowError();
});

test('Returns unqualified identifier if input is incomplete qualified identifier and ignoreIncomplete = true', () => {
  const input: FakeTokenList = [{ kind: 'identifier' }, { kind: 'dot_separator' }];
  const [identifier, rest] = parseIdentifier(input as Token[], true);
  expect(identifier).toEqual({
    nodeType: 'unqualified_identifier',
    token: input[0],
  });
  expect(rest).toEqual([input[1]]);
});
