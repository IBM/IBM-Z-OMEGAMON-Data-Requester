import { Variable, StringLiteral, Token } from './token';
import { tokenize } from './tokenize';

test('Empty input should return empty token array', () => {
  const tokens = tokenize('');
  expect(tokens).toMatchObject([]);
});

test('Single SELECT keyword should return single token', () => {
  const tokens = tokenize('SELECT');
  expect(tokens).toMatchObject([{ kind: 'select_keyword' }] as Token[]);
});

test('Two keywords splitted with whitespace should return 2 tokens', () => {
  const tokens = tokenize('SELECT FROM');
  expect(tokens).toMatchObject([{ kind: 'select_keyword' }, { kind: 'from_keyword' }] as Token[]);
});

test('Two keywords without whitespace should be an identifier', () => {
  const tokens = tokenize('SELECTFROM');
  expect(tokens).toMatchObject([{ kind: 'identifier' }] as Token[]);
});

test('Comma-separated identifiers', () => {
  const tokens = tokenize('AFFINITIES,ORIGINNODE,THRUNODE');
  expect(tokens).toMatchObject([
    { kind: 'identifier', tokenText: 'AFFINITIES' },
    { kind: 'comma_separator', tokenText: ',' },
    { kind: 'identifier', tokenText: 'ORIGINNODE' },
    { kind: 'comma_separator', tokenText: ',' },
    { kind: 'identifier', tokenText: 'THRUNODE' },
  ] as Token[]);
});

test('Comma-separated identifiers (+ spaces)', () => {
  const tokens = tokenize('AFFINITIES, ORIGINNODE,	THRUNODE');
  expect(tokens).toMatchObject([
    { kind: 'identifier', tokenText: 'AFFINITIES' },
    { kind: 'comma_separator', tokenText: ',' },
    { kind: 'identifier', tokenText: 'ORIGINNODE' },
    { kind: 'comma_separator', tokenText: ',' },
    { kind: 'identifier', tokenText: 'THRUNODE' },
  ] as Token[]);
});

test('Complete example', () => {
  const tokens = tokenize(
    'SELECT AFFINITIES, ORIGINNODE, THRUNODE FROM O4SRV.INODESTS AT(*HUB) WHERE ORIGINNODE <> "TESTNODE" AND O4ONLINE = "Y" OR ORIGINNODE = -42'
  );
  expect(tokens).toMatchObject([
    { kind: 'select_keyword' },
    { kind: 'identifier' },
    { kind: 'comma_separator' },
    { kind: 'identifier' },
    { kind: 'comma_separator' },
    { kind: 'identifier' },
    { kind: 'from_keyword' },
    { kind: 'identifier' },
    { kind: 'dot_separator' },
    { kind: 'identifier' },
    { kind: 'at_keyword' },
    { kind: 'open_parenthesis' },
    { kind: 'mul_arithmetic_operator' },
    { kind: 'identifier' },
    { kind: 'close_parenthesis' },
    { kind: 'where_keyword' },
    { kind: 'identifier' },
    { kind: 'ne_comparison_operator' },
    { kind: 'string_literal', value: 'TESTNODE' },
    { kind: 'and_condition_connector' },
    { kind: 'identifier' },
    { kind: 'eq_comparison_operator' },
    { kind: 'string_literal', value: 'Y' },
    { kind: 'or_condition_connector' },
    { kind: 'identifier' },
    { kind: 'eq_comparison_operator' },
    { kind: 'sub_arithmetic_operator' },
    { kind: 'decimal_literal', value: 42 },
  ] as Token[]);
});

test('Identifier with underscore', () => {
  const tokens = tokenize('IDEN_TIFIER');
  expect(tokens).toMatchObject([
    {
      kind: 'identifier',
      tokenText: 'IDEN_TIFIER',
    },
  ] as Token[]);
});

test('Group by tokenizes as two keywords', () => {
  const tokens = tokenize('GROUP BY INODESTS');
  expect(tokens).toMatchObject([
    {
      kind: 'group_keyword',
    },
    {
      kind: 'by_keyword',
    },
    {
      kind: 'identifier',
      tokenText: 'INODESTS',
    },
  ] as Token[]);
});

test('Order by acs tokenizes in a "order direction" token', () => {
  const tokens = tokenize('ORDER BY INODESTS, PRODUCT ASC');
  expect(tokens).toMatchObject([
    {
      kind: 'order_keyword',
    },
    {
      kind: 'by_keyword',
    },
    {
      kind: 'identifier',
      tokenText: 'INODESTS',
    },
    {
      kind: 'comma_separator',
    },
    {
      kind: 'identifier',
      tokenText: 'PRODUCT',
    },
    {
      kind: 'asc_order_direction',
    },
  ] as Token[]);
});

test('Unexpected token should not crash tokenizer', () => {
  expect(tokenize('SELECT #SOMETHING WRONG')).toMatchObject([
    { kind: 'select_keyword' },
    { kind: 'unknown', tokenText: '#', problems: [{ severity: 'error' }] },
    { kind: 'identifier', tokenText: 'SOMETHING' },
    { kind: 'identifier', tokenText: 'WRONG' },
  ]);

  expect(tokenize('SELECT #')).toMatchObject([
    { kind: 'select_keyword' },
    { kind: 'unknown', tokenText: '#', problems: [{ severity: 'error' }] },
  ]);
});

test('Unexpected tokens should be grouped', () => {
  expect(tokenize('SELECT ###SOMETHING WRONG')).toMatchObject([
    { kind: 'select_keyword' },
    { kind: 'unknown', tokenText: '###', problems: [{ severity: 'error' }] },
    { kind: 'identifier', tokenText: 'SOMETHING' },
    { kind: 'identifier', tokenText: 'WRONG' },
  ]);
});

describe('String literals', () => {
  test('Literal with double quotes', () => {
    const tokens = tokenize('"TEST"');
    expect(tokens).toMatchObject([{ kind: 'string_literal', value: 'TEST' }] as Token[]);
  });

  test('Literal with single quotes', () => {
    const tokens = tokenize("'TEST'");
    expect(tokens).toMatchObject([{ kind: 'string_literal', value: 'TEST' }] as Token[]);
  });

  test('Literal with quotes escaping: double quotes', () => {
    const tokens = tokenize('"TE""ST"');
    expect(tokens).toMatchObject([{ kind: 'string_literal', value: 'TE"ST' }] as Token[]);
  });

  test('Literal with quotes escaping: single quotes', () => {
    const tokens = tokenize("'TE''ST'");
    expect(tokens).toMatchObject([{ kind: 'string_literal', value: "TE'ST" }] as Token[]);
  });

  test('Unclosed string literal', () => {
    const tokens = tokenize('WHERE A <> "TEST');
    expect(tokens).toMatchObject([
      { kind: 'where_keyword' },
      { kind: 'identifier', tokenText: 'A' },
      { kind: 'ne_comparison_operator' },
      {
        kind: 'string_literal',
        value: 'TEST',
        problems: [{ severity: 'error' }],
      },
    ]);
  });
});

describe('Numeric literals', () => {
  test('Dec literal is parsed as decimal', () => {
    const tokens = tokenize('42');
    expect(tokens).toMatchObject([
      {
        kind: 'decimal_literal',
        resolved: true,
        value: 42,
      },
    ] as Token[]);
  });

  test('0 is parsed as 0', () => {
    const tokens = tokenize('0');
    expect(tokens).toMatchObject([
      {
        kind: 'decimal_literal',
        resolved: true,
        value: 0,
      },
    ] as Token[]);
  });

  test('-42 is parsed as 2 tokens', () => {
    const tokens = tokenize('-42');
    expect(tokens).toMatchObject([
      {
        kind: 'sub_arithmetic_operator',
      },
      {
        kind: 'decimal_literal',
        resolved: true,
        value: 42,
      },
    ] as Token[]);
  });

  test('Hex literal is parsed', () => {
    const tokens = tokenize('0x2A');
    expect(tokens).toMatchObject([
      {
        kind: 'hexadecimal_literal',
        resolved: true,
        value: 42,
      },
    ] as Token[]);
  });

  test('Hex literal with wrong length has a problem attached', () => {
    const tokens = tokenize('0x02A');
    expect(tokens).toMatchObject([
      {
        kind: 'hexadecimal_literal',
        resolved: true,
        value: 42,
        problems: [{ severity: 'warning' }],
      },
    ]);
  });

  test('Uppercase Hex literal', () => {
    const tokens = tokenize('0X2A');
    expect(tokens).toMatchObject([
      {
        kind: 'hexadecimal_literal',
        resolved: true,
        value: 42,
      },
    ]);
  });

  test('Lowercase Hex literal', () => {
    const tokens = tokenize('0x2a');
    expect(tokens).toMatchObject([
      {
        kind: 'hexadecimal_literal',
        resolved: true,
        value: 42,
      },
    ]);
  });

  test('0xTEST generates hex literal with a problem and identifier', () => {
    const tokens = tokenize('0xTEST');
    expect(tokens).toMatchObject([
      {
        kind: 'hexadecimal_literal',
        resolved: false,
        problems: [
          { severity: 'warning', message: expect.stringContaining('size') },
          { severity: 'error', message: expect.stringContaining('Unresolved') },
        ],
      },
      {
        kind: 'identifier',
        tokenText: 'TEST',
      },
    ]);
  });
});

describe('Variables', () => {
  test('Tokenizing variable $blabla works as expected', () => {
    const tokens = tokenize('$blabla');
    const expectedToken: Partial<Variable> = {
      kind: 'variable',
      genericKind: 'variable',
      problems: [],
      tokenText: '$blabla',
      varName: 'blabla',
    };
    expect(tokens).toMatchObject([expectedToken]);
  });

  test('Tokenizing variable ${blabla} works as expected', () => {
    const tokens = tokenize('${blabla}');
    const expectedToken: Partial<Variable> = {
      kind: 'variable',
      genericKind: 'variable',
      problems: [],
      tokenText: '${blabla}',
      varName: 'blabla',
    };
    expect(tokens).toMatchObject([expectedToken]);
  });

  test("Tokenizing string with variables 'asdasd$blabla${asdasd}as${gfjhgfh}dasd' works as expected", () => {
    const tokens = tokenize("'asdasd$blabla${asdasd}as${gfjhgfh}dasd'");
    const expectedTokens: Array<Partial<Variable | StringLiteral>> = [
      {
        kind: 'string_literal',
        genericKind: 'literal',
        problems: [],
        tokenText: "'asdasd",
        value: 'asdasd',
      },
      {
        kind: 'variable',
        genericKind: 'variable',
        problems: [],
        tokenText: '$blabla',
        varName: 'blabla',
      },
      {
        kind: 'variable',
        genericKind: 'variable',
        problems: [],
        tokenText: '${asdasd}',
        varName: 'asdasd',
      },
      {
        kind: 'string_literal',
        genericKind: 'literal',
        problems: [],
        tokenText: 'as',
        value: 'as',
      },
      {
        kind: 'variable',
        genericKind: 'variable',
        problems: [],
        tokenText: '${gfjhgfh}',
        varName: 'gfjhgfh',
      },
      {
        kind: 'string_literal',
        genericKind: 'literal',
        problems: [],
        tokenText: "dasd'",
        value: 'dasd',
      },
    ];
    expect(tokens).toMatchObject(expectedTokens);
  });

  test('Tokenizing ${ var } works as expected', () => {
    const tokens = tokenize('${ var }');
    const expectedTokens: Token[] = [
      {
        endIdx: 2,
        genericKind: 'unknown',
        kind: 'unknown',
        problems: [
          {
            message: "Unexpected token '${'",
            severity: 'error',
          },
        ],
        startIdx: 0,
        tokenText: '${',
      },
      {
        endIdx: 6,
        genericKind: 'identifier',
        kind: 'identifier',
        problems: [],
        startIdx: 3,
        tokenText: 'var',
      },
      {
        endIdx: 8,
        genericKind: 'unknown',
        kind: 'unknown',
        problems: [
          {
            message: "Unexpected token '}'",
            severity: 'error',
          },
        ],
        startIdx: 7,
        tokenText: '}',
      },
    ];
    expect(tokens).toMatchObject(expectedTokens);
  });

  test("Tokenizing '${ var }' works as expected", () => {
    const tokens = tokenize("'${ var }'");
    const expectedTokens: Token[] = [
      {
        endIdx: 10,
        genericKind: 'literal',
        kind: 'string_literal',
        problems: [],
        startIdx: 0,
        tokenText: "'${ var }'",
        value: '${ var }',
      },
    ];
    expect(tokens).toMatchObject(expectedTokens);
  });

  test('Tokenizing $${sdf} works as expected', () => {
    const tokens = tokenize('$${sdf}');
    const expectedTokens: Token[] = [
      {
        endIdx: 1,
        genericKind: 'unknown',
        kind: 'unknown',
        problems: [
          {
            message: "Unexpected token '$'",
            severity: 'error',
          },
        ],
        startIdx: 0,
        tokenText: '$',
      },
      {
        endIdx: 7,
        genericKind: 'variable',
        kind: 'variable',
        problems: [],
        startIdx: 1,
        tokenText: '${sdf}',
        varName: 'sdf',
      },
    ];
    expect(tokens).toMatchObject(expectedTokens);
  });

  test("Tokenizing '$${sdf}' works as expected", () => {
    const tokens = tokenize("'$${sdf}'");
    const expectedTokens: Token[] = [
      {
        endIdx: 2,
        genericKind: 'literal',
        kind: 'string_literal',
        problems: [],
        valueGroupId: {
          endIdx: 9,
          genericKind: 'literal',
          kind: 'string_literal',
          problems: [],
          startIdx: 0,
          tokenText: "'$${sdf}'",
          value: '$${sdf}',
        },
        startIdx: 0,
        tokenText: "'$",
        value: '$',
      },
      {
        endIdx: 8,
        genericKind: 'variable',
        kind: 'variable',
        problems: [],
        valueGroupId: {
          endIdx: 9,
          genericKind: 'literal',
          kind: 'string_literal',
          problems: [],
          startIdx: 0,
          tokenText: "'$${sdf}'",
          value: '$${sdf}',
        },
        startIdx: 2,
        tokenText: '${sdf}',
        varName: 'sdf',
      },
      {
        endIdx: 9,
        genericKind: 'literal',
        kind: 'string_literal',
        problems: [],
        valueGroupId: {
          endIdx: 9,
          genericKind: 'literal',
          kind: 'string_literal',
          problems: [],
          startIdx: 0,
          tokenText: "'$${sdf}'",
          value: '$${sdf}',
        },
        startIdx: 8,
        tokenText: "'",
        value: '',
      },
    ];
    expect(tokens).toMatchObject(expectedTokens);
  });

  test('Tokenizing ${$sdfsd} works as expected', () => {
    const tokens = tokenize('${$sdfsd}');
    const expectedTokens: Token[] = [
      {
        endIdx: 2,
        genericKind: 'unknown',
        kind: 'unknown',
        problems: [
          {
            message: "Unexpected token '${'",
            severity: 'error',
          },
        ],
        startIdx: 0,
        tokenText: '${',
      },
      {
        endIdx: 8,
        genericKind: 'variable',
        kind: 'variable',
        problems: [],
        startIdx: 2,
        tokenText: '$sdfsd',
        varName: 'sdfsd',
      },
      {
        endIdx: 9,
        genericKind: 'unknown',
        kind: 'unknown',
        problems: [
          {
            message: "Unexpected token '}'",
            severity: 'error',
          },
        ],
        startIdx: 8,
        tokenText: '}',
      },
    ];
    expect(tokens).toMatchObject(expectedTokens);
  });

  test("Tokenizing '${$sdfsd}' works as expected", () => {
    const tokens = tokenize("'${$sdfsd}'");
    const expectedTokens: Token[] = [
      {
        endIdx: 3,
        genericKind: 'literal',
        kind: 'string_literal',
        problems: [],
        valueGroupId: {
          endIdx: 11,
          genericKind: 'literal',
          kind: 'string_literal',
          problems: [],
          startIdx: 0,
          tokenText: "'${$sdfsd}'",
          value: '${$sdfsd}',
        },
        startIdx: 0,
        tokenText: "'${",
        value: '${',
      },
      {
        endIdx: 9,
        genericKind: 'variable',
        kind: 'variable',
        problems: [],
        valueGroupId: {
          endIdx: 11,
          genericKind: 'literal',
          kind: 'string_literal',
          problems: [],
          startIdx: 0,
          tokenText: "'${$sdfsd}'",
          value: '${$sdfsd}',
        },
        startIdx: 3,
        tokenText: '$sdfsd',
        varName: 'sdfsd',
      },
      {
        endIdx: 11,
        genericKind: 'literal',
        kind: 'string_literal',
        problems: [],
        valueGroupId: {
          endIdx: 11,
          genericKind: 'literal',
          kind: 'string_literal',
          problems: [],
          startIdx: 0,
          tokenText: "'${$sdfsd}'",
          value: '${$sdfsd}',
        },
        startIdx: 9,
        tokenText: "}'",
        value: '}',
      },
    ];
    expect(tokens).toMatchObject(expectedTokens);
  });

  test("Tokenizing '${sd_fsd}' works as expected", () => {
    const tokens = tokenize("'${sd_fsd}'");
    const expectedTokens: Token[] = [
      {
        endIdx: 1,
        genericKind: 'literal',
        kind: 'string_literal',
        problems: [],
        startIdx: 0,
        tokenText: "'",
        value: '',
        valueGroupId: {
          endIdx: 11,
          genericKind: 'literal',
          kind: 'string_literal',
          problems: [],
          startIdx: 0,
          tokenText: "'${sd_fsd}'",
          value: '${sd_fsd}',
        },
      },
      {
        endIdx: 10,
        genericKind: 'variable',
        kind: 'variable',
        problems: [],
        startIdx: 1,
        tokenText: '${sd_fsd}',
        valueGroupId: {
          endIdx: 11,
          genericKind: 'literal',
          kind: 'string_literal',
          problems: [],
          startIdx: 0,
          tokenText: "'${sd_fsd}'",
          value: '${sd_fsd}',
        },
        varName: 'sd_fsd',
      },
      {
        endIdx: 11,
        genericKind: 'literal',
        kind: 'string_literal',
        problems: [],
        startIdx: 10,
        tokenText: "'",
        value: '',
        valueGroupId: {
          endIdx: 11,
          genericKind: 'literal',
          kind: 'string_literal',
          problems: [],
          startIdx: 0,
          tokenText: "'${sd_fsd}'",
          value: '${sd_fsd}',
        },
      },
    ];
    expect(tokens).toMatchObject(expectedTokens);
  });

  test("Tokenizing '${sd*fsd}' works as expected", () => {
    const tokens = tokenize("'${sd*fsd}'");
    const expectedTokens: Token[] = [
      {
        endIdx: 11,
        genericKind: 'literal',
        kind: 'string_literal',
        problems: [],
        startIdx: 0,
        tokenText: "'${sd*fsd}'",
        value: '${sd*fsd}',
      },
    ];
    expect(tokens).toMatchObject(expectedTokens);
  });

  test("Tokenizing '${sd fsd}' works as expected", () => {
    const tokens = tokenize("'${sd fsd}'");
    const expectedTokens: Token[] = [
      {
        endIdx: 11,
        genericKind: 'literal',
        kind: 'string_literal',
        problems: [],
        startIdx: 0,
        tokenText: "'${sd fsd}'",
        value: '${sd fsd}',
      },
    ];
    expect(tokens).toMatchObject(expectedTokens);
  });
});
