import { Token, TokenKind } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { extract, parseSeparated } from './common';
import { parseIdentifier } from './parseIdentifier';

type FakeTokenList = Array<{ kind: TokenKind }>;

describe('extract', () => {
  test('returns null if there are no tokens left', () => {
    const result = extract([], 'identifier');
    expect(result).toEqual([null, []]);
  });

  test('returns null if there are not enough tokens left', () => {
    const input: FakeTokenList = [{ kind: 'select_keyword' }];
    const result = extract(input as Token[], 'select_keyword', 'add_arithmetic_operator');
    expect(result).toEqual([input[0], null, []]);
  });

  test('returns null if not matched', () => {
    const input: FakeTokenList = [{ kind: 'select_keyword' }];
    const result = extract(input as Token[], 'identifier');
    expect(result).toEqual([null, []]);
  });

  test('returns null only for unmatched tokens', () => {
    const input: FakeTokenList = [
      { kind: 'identifier' },
      { kind: 'add_arithmetic_operator' },
      { kind: 'decimal_literal' },
    ];
    const result = extract(input as Token[], 'identifier', 'add_arithmetic_operator', 'identifier');
    expect(result).toEqual([input[0], input[1], null, []]);
  });

  test('returns empty rest if matched last token', () => {
    const input: FakeTokenList = [{ kind: 'identifier' }];
    const result = extract(input as Token[], 'identifier');
    expect(result).toEqual([input[0], []]);
  });

  test('returns non-empty rest if there are tokens left', () => {
    const input: FakeTokenList = [{ kind: 'identifier' }, { kind: 'close_parenthesis' }];
    const result = extract(input as Token[], 'identifier');
    expect(result).toEqual([input[0], [input[1]]]);
  });

  test('returns all matched tokens as non-null', () => {
    const input: FakeTokenList = [
      { kind: 'identifier' },
      { kind: 'add_arithmetic_operator' },
      { kind: 'decimal_literal' },
    ];
    const result = extract(input as Token[], 'identifier', 'add_arithmetic_operator', 'decimal_literal');
    expect(result).toEqual([input[0], input[1], input[2], []]);
  });
});

describe('parseSeparated', () => {
  test('Returns items separated by separator', () => {
    const input = [
      { kind: 'identifier' },
      { kind: 'comma_separator' },
      { kind: 'identifier' },
      { kind: 'comma_separator' },
      { kind: 'identifier' },
    ] as Token[];

    const [matches, rest] = parseSeparated(input, 'comma_separator', parseIdentifier);

    expect(matches).toHaveLength(3);
    matches.forEach((match) => expect(match.nodeType).toBe('unqualified_identifier'));
    expect(rest).toEqual([]);
  });

  test('Returns one element if separator is not found', () => {
    const input = [
      { kind: 'identifier' },
      { kind: 'identifier' },
      { kind: 'identifier' },
      { kind: 'comma_separator' },
      { kind: 'identifier' },
    ] as Token[];

    const [matches, rest] = parseSeparated(input, 'comma_separator', parseIdentifier);

    expect(matches).toHaveLength(1);
    matches.forEach((match) => expect(match.nodeType).toBe('unqualified_identifier'));
    const [_, ...restInputs] = input;
    expect(rest).toEqual(restInputs);
  });

  test('Ignores wrong separators', () => {
    const input = [
      { kind: 'identifier' },
      { kind: 'statement_separator' },
      { kind: 'identifier' },
      { kind: 'comma_separator' },
      { kind: 'identifier' },
    ] as Token[];

    const [matches, rest] = parseSeparated(input, 'comma_separator', parseIdentifier);

    expect(matches).toHaveLength(1);
    matches.forEach((match) => expect(match.nodeType).toBe('unqualified_identifier'));
    const [_, ...restInputs] = input;
    expect(rest).toEqual(restInputs);
  });

  test('Returns empty tuple if separator is first token', () => {
    const input = [
      { kind: 'comma_separator' },
      { kind: 'identifier' },
      { kind: 'comma_separator' },
      { kind: 'identifier' },
    ] as Token[];

    const [matches, rest] = parseSeparated(input, 'comma_separator', parseIdentifier);

    expect(matches).toHaveLength(0);
    expect(rest).toEqual(input);
  });

  test('Throws if fails to parse item after separator', () => {
    const input = [{ kind: 'identifier' }, { kind: 'comma_separator' }, { kind: 'comma_separator' }] as Token[];

    expect(() => parseSeparated(input, 'comma_separator', parseIdentifier)).toThrowError();
  });
});
