import { assert } from 'public-common';

import { TokenMapping } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter/internals';
import { parseSelectStatement } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';
import { tokenize } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { buildIntermediateRepresentation } from './buildIntermediateRepresentation';
import { ParmasExtractionResult, findParmas } from './findParmas';
import { IntermediateFilter } from './intermediateFilter';

function getRootOfWhere(filterStr: string): IntermediateFilter {
  const { statement } = parseSelectStatement(tokenize(`SELECT C FROM A.T WHERE ${filterStr}`));
  const where = statement?.where;
  assert(where);
  return buildIntermediateRepresentation(where.filter);
}

function getParmasFromWhere(filterStr: string): ParmasExtractionResult[] {
  return findParmas(getRootOfWhere(filterStr), new TokenMapping());
}

test('Returns empty array if there is no PARMA in query', () => {
  expect(getParmasFromWhere('ORIGINNODE = "TEST"')).toHaveLength(0);
});

test('Returns single PARMA being the only filter in query', () => {
  const root = getRootOfWhere('SYSTEM.PARMA("NODELIST", "Y", 1)');
  const result = findParmas(root, new TokenMapping());

  expect(result).toHaveLength(1);
  assert(result[0]);
  const { filterNode, parma } = result[0];
  expect(filterNode).toBe(root);
  expect(parma).toMatchObject({
    name: 'NODELIST',
    value: 'Y',
    length: 1,
  });
});

test('Returns single PARMA connected with other filters', () => {
  const root = getRootOfWhere('ORIGINNODE = "TEST" AND SYSTEM.PARMA("NODELIST", "Y", 1)');
  const result = findParmas(root, new TokenMapping());

  expect(result).toHaveLength(1);
  assert(result[0]);
  const { filterNode, parma } = result[0];
  expect(filterNode).not.toBe(root);
  expect(parma).toMatchObject({
    name: 'NODELIST',
    value: 'Y',
    length: 1,
  });
});

test('Returns correct PARMA if only name is specified', () => {
  const result = getParmasFromWhere('SYSTEM.PARMA("NODELIST")');
  expect(result).toHaveLength(1);
  assert(result[0]);
  const { parma } = result[0];
  expect(parma).toEqual({
    name: 'NODELIST',
  });
});

test('Returns correct PARMA even if length is not specified', () => {
  const result = getParmasFromWhere('SYSTEM.PARMA("NODELIST", "Y")');
  expect(result).toHaveLength(1);
  assert(result[0]);
  const { parma } = result[0];
  expect(parma).toEqual({
    name: 'NODELIST',
    value: 'Y',
  });
});

test('Returns all PARMAs if there are several of them', () => {
  const result = getParmasFromWhere(
    'SYSTEM.PARMA("NODELIST1", "42", 1) AND SYSTEM.PARMA("NODELIST2", "42", 1) AND SYSTEM.PARMA("NODELIST3", "42", 1)'
  );
  expect(result).toHaveLength(3);

  result.forEach(({ parma }) => {
    expect(parma).toEqual({
      name: expect.stringContaining('NODELIST'),
      value: '42',
      length: 1,
    });
  });
});

test('Throws if connected via OR', () => {
  expect(() => getParmasFromWhere('SYSTEM.PARMA("NODELIST") OR ITMSKS=1')).toThrowError(
    'SYSTEM.PARMA function should be connected via AND'
  );
});

test('Throws if not on root level', () => {
  expect(() => getParmasFromWhere('(SYSTEM.PARMA("NODELIST") OR ITMSKS=1) AND ITMNTW<>1')).toThrowError(
    'SYSTEM.PARMA function should only be called on top level of WHERE clause'
  );
});

test('Throws if parma name is not a string', () => {
  expect(() => getParmasFromWhere('SYSTEM.PARMA(42, 42, 42)')).toThrowError(
    'SYSTEM.PARMA parameter name should be a string'
  );
});

test('Throws if parma value is not a string', () => {
  expect(() => getParmasFromWhere('SYSTEM.PARMA("42", 42, 42)')).toThrowError(
    'SYSTEM.PARMA parameter value should be a string (numbers should be wrapped in quotes)'
  );
});

test('Throws if parma length is not a number', () => {
  expect(() => getParmasFromWhere('SYSTEM.PARMA("NODELIST", "42", "42")')).toThrowError(
    'SYSTEM.PARMA parameter length should be an integer'
  );
});

test('Throws if no arguments provided', () => {
  expect(() => getParmasFromWhere('SYSTEM.PARMA()')).toThrowError('SYSTEM.PARMA call requires name of the parameter');
});

test('Throws if too many arguments', () => {
  expect(() => getParmasFromWhere('SYSTEM.PARMA("NODELIST", 42, 42, 42)')).toThrowError(
    'SYSTEM.PARMA only takes 3 arguments'
  );
});
