import { tokenize } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { SelectStatement } from './AstNode';
import { parseSelectStatement } from './parseSelectStatement';

test('all clauses in one query', () => {
  const { statement } = parseSelectStatement(
    tokenize(
      '\
          SELECT ORIGINNODE, O4ONLINE \
          FROM O4SRV.INODESTS \
          AT("*HUB") \
          HISTORY() \
          WHERE ORIGINNODE <> "Anything" \
          GROUP BY THRUNODE \
          HAVING AVG(O4ONLINE) = 5 \
          ORDER BY ORIGINNODE \
          '
    )
  );

  expect(statement).toMatchObject({
    select: {
      nodeType: 'select',
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
            tokenText: 'O4ONLINE',
          },
        },
      ],
    },
    from: {
      nodeType: 'from',
      tables: [
        {
          nodeType: 'qualified_identifier',
          left: {
            kind: 'identifier',
            tokenText: 'O4SRV',
          },
          right: {
            kind: 'identifier',
            tokenText: 'INODESTS',
          },
        },
      ],
    },
    at: {
      nodeType: 'at',
      items: [
        {
          nodeType: 'value',
          tokens: [{ kind: 'string_literal', value: '*HUB' }],
        },
      ],
    },
  } as SelectStatement);
});

test('returns null if there is no select keyword match', () => {
  const { statement, problems } = parseSelectStatement(tokenize('ELECT ORIGINNODE, THRUNODE FROM O4SRV'));

  expect(statement).toBe(null);
  expect(problems).toMatchSnapshot();
});

test('returns partial match if comma is missed', () => {
  const _cmsSql = 'SELECT ORIGINNODE THRUNODE FROM O4SRV';
  const { statement, problems } = parseSelectStatement(tokenize(_cmsSql));

  expect({ _cmsSql, statement, problems }).toMatchSnapshot();
});

test('returns error if there is no identifier after the comma', () => {
  const _cmsSql = 'SELECT ORIGINNODE, 43 FROM O4SRV';
  const { statement, problems } = parseSelectStatement(tokenize(_cmsSql));

  expect(statement).toBeNull();
  expect(problems).toMatchObject([
    {
      message: 'Unexpected tokens after the separator',
    },
    {
      message: 'Unexpected token(s) found',
    },
    {
      message: 'Both SELECT and FROM clauses are mandatory',
    },
  ]);
});

test("Parse SELECT A FROM B.C WHERE A = 'str1${var1}''str2${var2}'", () => {
  const cmsSql = "SELECT A FROM B.C WHERE A = 'str1${var1}''str2${var2}'";
  const { problems, statement } = parseSelectStatement(tokenize(cmsSql));

  expect(problems).toHaveLength(0);
  expect(statement).toStrictEqual({
    at: null,
    from: {
      keyword: {
        endIdx: 13,
        genericKind: 'keyword',
        kind: 'from_keyword',
        problems: [],
        startIdx: 9,
        tokenText: 'FROM',
      },
      nodeType: 'from',
      tables: [
        {
          left: {
            endIdx: 15,
            genericKind: 'identifier',
            kind: 'identifier',
            problems: [],
            startIdx: 14,
            tokenText: 'B',
          },
          nodeType: 'qualified_identifier',
          right: {
            endIdx: 17,
            genericKind: 'identifier',
            kind: 'identifier',
            problems: [],
            startIdx: 16,
            tokenText: 'C',
          },
        },
      ],
    },
    groupBy: null,
    having: null,
    history: null,
    nodeType: 'select_statement',
    orderBy: null,
    select: {
      items: [
        {
          nodeType: 'unqualified_identifier',
          token: {
            endIdx: 8,
            genericKind: 'identifier',
            kind: 'identifier',
            problems: [],
            startIdx: 7,
            tokenText: 'A',
          },
        },
      ],
      keyword: {
        endIdx: 6,
        genericKind: 'keyword',
        kind: 'select_keyword',
        problems: [],
        startIdx: 0,
        tokenText: 'SELECT',
      },
      nodeType: 'select',
    },
    where: {
      filter: {
        left: {
          nodeType: 'unqualified_identifier',
          token: {
            endIdx: 25,
            genericKind: 'identifier',
            kind: 'identifier',
            problems: [],
            startIdx: 24,
            tokenText: 'A',
          },
        },
        nodeType: 'binary',
        operator: {
          endIdx: 27,
          genericKind: 'comparison_operator',
          kind: 'eq_comparison_operator',
          problems: [],
          startIdx: 26,
          tokenText: '=',
        },
        right: {
          asUserDefinedValue: "str1${var1}'str2${var2}",
          nodeType: 'value',
          tokens: [
            {
              endIdx: 33,
              genericKind: 'literal',
              kind: 'string_literal',
              problems: [],
              valueGroupId: {
                endIdx: 54,
                genericKind: 'literal',
                kind: 'string_literal',
                problems: [],
                startIdx: 28,
                tokenText: "'str1${var1}''str2${var2}'",
                value: "str1${var1}'str2${var2}",
              },
              startIdx: 28,
              tokenText: "'str1",
              value: 'str1',
            },
            {
              endIdx: 40,
              genericKind: 'variable',
              kind: 'variable',
              problems: [],
              valueGroupId: {
                endIdx: 54,
                genericKind: 'literal',
                kind: 'string_literal',
                problems: [],
                startIdx: 28,
                tokenText: "'str1${var1}''str2${var2}'",
                value: "str1${var1}'str2${var2}",
              },
              startIdx: 33,
              tokenText: '${var1}',
              varName: 'var1',
            },
            {
              endIdx: 46,
              genericKind: 'literal',
              kind: 'string_literal',
              problems: [],
              valueGroupId: {
                endIdx: 54,
                genericKind: 'literal',
                kind: 'string_literal',
                problems: [],
                startIdx: 28,
                tokenText: "'str1${var1}''str2${var2}'",
                value: "str1${var1}'str2${var2}",
              },
              startIdx: 40,
              tokenText: "''str2",
              value: "'str2",
            },
            {
              endIdx: 53,
              genericKind: 'variable',
              kind: 'variable',
              problems: [],
              valueGroupId: {
                endIdx: 54,
                genericKind: 'literal',
                kind: 'string_literal',
                problems: [],
                startIdx: 28,
                tokenText: "'str1${var1}''str2${var2}'",
                value: "str1${var1}'str2${var2}",
              },
              startIdx: 46,
              tokenText: '${var2}',
              varName: 'var2',
            },
            {
              endIdx: 54,
              genericKind: 'literal',
              kind: 'string_literal',
              problems: [],
              valueGroupId: {
                endIdx: 54,
                genericKind: 'literal',
                kind: 'string_literal',
                problems: [],
                startIdx: 28,
                tokenText: "'str1${var1}''str2${var2}'",
                value: "str1${var1}'str2${var2}",
              },
              startIdx: 53,
              tokenText: "'",
              value: '',
            },
          ],
        },
      },
      keyword: {
        endIdx: 23,
        genericKind: 'keyword',
        kind: 'where_keyword',
        problems: [],
        startIdx: 18,
        tokenText: 'WHERE',
      },
      nodeType: 'where',
    },
  });
});

test("Parse SELECT A FROM B.C WHERE A = 'str1${var1}' 'str2${var2}'", () => {
  const cmsSql = "SELECT A FROM B.C WHERE A = 'str1${var1}' 'str2${var2}'";
  const { problems } = parseSelectStatement(tokenize(cmsSql));

  expect(problems).toStrictEqual([
    {
      message: 'Unexpected tokens at the end of statement',
      problemTokens: [
        {
          endIdx: 47,
          genericKind: 'literal',
          kind: 'string_literal',
          problems: [],
          valueGroupId: {
            endIdx: 55,
            genericKind: 'literal',
            kind: 'string_literal',
            problems: [],
            startIdx: 42,
            tokenText: "'str2${var2}'",
            value: 'str2${var2}',
          },
          startIdx: 42,
          tokenText: "'str2",
          value: 'str2',
        },
        {
          endIdx: 54,
          genericKind: 'variable',
          kind: 'variable',
          problems: [],
          valueGroupId: {
            endIdx: 55,
            genericKind: 'literal',
            kind: 'string_literal',
            problems: [],
            startIdx: 42,
            tokenText: "'str2${var2}'",
            value: 'str2${var2}',
          },
          startIdx: 47,
          tokenText: '${var2}',
          varName: 'var2',
        },
        {
          endIdx: 55,
          genericKind: 'literal',
          kind: 'string_literal',
          problems: [],
          valueGroupId: {
            endIdx: 55,
            genericKind: 'literal',
            kind: 'string_literal',
            problems: [],
            startIdx: 42,
            tokenText: "'str2${var2}'",
            value: 'str2${var2}',
          },
          startIdx: 54,
          tokenText: "'",
          value: '',
        },
      ],
      severity: 'error',
    },
  ]);
});
