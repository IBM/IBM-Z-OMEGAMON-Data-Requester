import { tokenize } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { SelectClause } from './AstNode';
import { parseSelectClause } from './parseSelectClause';

test('single identifier returns single child node', () => {
  const [result] = parseSelectClause(tokenize('SELECT ORIGINNODE'));

  expect(result).toMatchObject({
    nodeType: 'select',
    keyword: {
      kind: 'select_keyword',
    },
    items: [
      {
        nodeType: 'unqualified_identifier',
        token: {
          kind: 'identifier',
          tokenText: 'ORIGINNODE',
        },
      },
    ],
  } as SelectClause);
});

test('multiple identifier returns correct amount of nodes in the same order as in query', () => {
  const [result] = parseSelectClause(tokenize('SELECT ORIGINNODE, THRUNODE, O4ONLINE'));

  expect(result).toMatchObject({
    nodeType: 'select',
    keyword: {
      kind: 'select_keyword',
    },
    items: [
      {
        nodeType: 'unqualified_identifier',
        token: {
          kind: 'identifier',
          tokenText: 'ORIGINNODE',
        },
      },
      {
        nodeType: 'unqualified_identifier',
        token: {
          kind: 'identifier',
          tokenText: 'THRUNODE',
        },
      },
      {
        nodeType: 'unqualified_identifier',
        token: {
          kind: 'identifier',
          tokenText: 'O4ONLINE',
        },
      },
    ],
  } as SelectClause);
});

test('throws if there is no single identifier provided', () => {
  expect(() => {
    parseSelectClause(tokenize('SELECT FRoM O4SRV.INODESTS'));
  }).toThrowError('Select statement misses identifiers to select');
});
