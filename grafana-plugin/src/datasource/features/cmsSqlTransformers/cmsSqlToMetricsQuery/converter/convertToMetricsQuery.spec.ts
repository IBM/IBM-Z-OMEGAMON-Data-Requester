import { throwIfNullish, assert, RecursivePartial } from 'public-common';
import { TableMetadata } from 'public-domain';

import { MetricsQueryParams } from 'datasource/domain';
import { buildLinesMap, getTokensPosition } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery';
import { parseSelectStatement } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';
import { tokenize } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';
import { MetadataLoader } from 'datasource/features/metadata';
import { mockedApplicationMetadatas } from 'datasource/features/metadata/mocks';

import { convertToMetricsQuery } from './convertToMetricsQuery';

const fakeTableMetadataLoader: Array<RecursivePartial<TableMetadata>> = [
  {
    applicationCode: 'KDP',
    id: 'REALTHDA',
    columns: {
      ORIGINNODE: { id: 'ORIGINNODE', type: 'string' },
      COL2: { id: 'COL2', type: 'number' },
      COL3: { id: 'COL3', type: 'number' },
    },
  },
  {
    applicationCode: 'APP',
    id: 'TABLE',
    columns: {
      ORIGINNODE: { id: 'ORIGINNODE', type: 'string' },
      COL1: { id: 'COL1', type: 'number' },
      COL2: { id: 'COL2', type: 'number' },
      COL3: { id: 'COL3', type: 'number' },
      FIELD1: { id: 'FIELD1', type: 'string' },
      FIELD2: { id: 'FIELD2', type: 'string' },
      FIELD3: { id: 'FIELD3', type: 'string' },
      FIELD4: { id: 'FIELD4', type: 'string' },
      FIELD5: { id: 'FIELD5', type: 'number' },
    },
  },
];

const fakeMetadataLoader = {
  getApplicationMetadatas: async () => mockedApplicationMetadatas,
  getTableMetadata: async (tableId: string) => {
    return fakeTableMetadataLoader.find((tableMd) => tableMd.id === tableId);
  },
} as unknown as MetadataLoader;

// Small helper function
export async function parseQueryString(queryStr: string) {
  const { statement } = parseSelectStatement(tokenize(queryStr));
  assert(statement);

  const { query, getTokensOf } = await convertToMetricsQuery(statement, fakeMetadataLoader);
  assert(query || getTokensOf);

  const getPositions = ((obj: object, field?: string | number) => {
    const linesMap = buildLinesMap(queryStr);

    const {
      globalStart: start,
      globalEnd: end,
      // @ts-expect-error getTokensOf has stricter definition
    } = getTokensPosition(getTokensOf(obj, field), linesMap);

    return [start, end];
  }) as unknown as typeof getTokensOf;

  return {
    query,
    getPositions,
    getTokensOf,
  };
}

describe('Token mapping', () => {
  test('Huge query', async () => {
    const queryStr =
      'SELECT field1, field2, avg(field3) FROM appl.table WHERE (originnode = "ON1" OR originnode = "ON2") AND field1 <> "34" AND field5 >   4 AND first(50) AND system.parma("PARMNAME1", "VAL1", 32) AND system.parma("PARNMANE2") GROUP BY field3 ORDER BY field1 asc, field2';
    // 0         10        20        30        40        50        60        70        80        90        100       110       120       130       140       150       160       170       180       190       200       210       220       230       240       250       260

    const { query, getPositions, getTokensOf } = await parseQueryString(queryStr);
    const { columns, filter, groupBy, orderBy, parmas, agentsAndGroups } = query;

    expect(getPositions(query)).toEqual([0, 265]);

    expect(getPositions(columns)).toEqual([0, 34]);
    const [col1, col2, col3] = columns;
    assert(col1 && col2 && col3);
    expect(getPositions(col1)).toEqual([7, 13]);
    expect(getPositions(col1, 'id')).toEqual([7, 13]);
    expect(getTokensOf(col1, 'aggregationFunction')).toHaveLength(0);
    expect(getPositions(col2)).toEqual([15, 21]);
    expect(getPositions(col2, 'id')).toEqual([15, 21]);
    expect(getTokensOf(col2, 'aggregationFunction')).toHaveLength(0);
    expect(getPositions(col3)).toEqual([23, 34]);
    expect(getPositions(col3, 'id')).toEqual([27, 33]);
    expect(getPositions(col3, 'aggregationFunction')).toEqual([23, 26]);

    expect(getPositions(query, 'tableId')).toEqual([45, 50]);

    expect(getPositions(agentsAndGroups)).toEqual([58, 98]);
    expect(getPositions(agentsAndGroups, 0)).toEqual([58, 76]);
    expect(getPositions(agentsAndGroups, 1)).toEqual([80, 98]);

    expect(getPositions(filter)).toEqual([104, 135]);
    const { nonAggregated } = filter;
    assert(nonAggregated && nonAggregated.and && nonAggregated.and[0]);
    expect(getPositions(nonAggregated)).toEqual([104, 135]);
    expect(getPositions(nonAggregated.and)).toEqual([104, 135]);
    expect(getPositions(nonAggregated.and[0])).toEqual([104, 118]);
    const [filter1, filter2] = nonAggregated.and;
    assert(filter1 && filter2);
    const clause1 = filter1.clause;
    const clause2 = filter2.clause;
    assert(clause1 && clause2);
    expect(getPositions(filter1)).toEqual([104, 118]);
    expect(getPositions(clause1)).toEqual([104, 118]);
    expect(getPositions(clause1, 'columnId')).toEqual([104, 110]);
    expect(getPositions(clause1, 'operator')).toEqual([111, 113]);
    expect(getPositions(clause1, 'userDefinedValue')).toEqual([114, 118]);
    expect(getPositions(filter2)).toEqual([123, 135]);
    expect(getPositions(clause2)).toEqual([123, 135]);
    expect(getPositions(clause2, 'columnId')).toEqual([123, 129]);
    expect(getPositions(clause2, 'operator')).toEqual([130, 131]);
    expect(getPositions(clause2, 'userDefinedValue')).toEqual([134, 135]);

    expect(getPositions(query, 'first')).toEqual([140, 149]);

    expect(getPositions(parmas)).toEqual([154, 221]);
    const [parma1, parma2] = parmas;
    assert(parma1 && parma2);
    expect(getPositions(parma1)).toEqual([154, 191]);
    expect(getPositions(parma1, 'name')).toEqual([167, 178]);
    expect(getPositions(parma1, 'value')).toEqual([180, 186]);
    expect(getPositions(parma1, 'length')).toEqual([188, 190]);
    expect(getPositions(parma2)).toEqual([196, 221]);
    expect(getPositions(parma2, 'name')).toEqual([209, 220]);
    expect(getTokensOf(parma2, 'value')).toHaveLength(0);
    expect(getTokensOf(parma2, 'length')).toHaveLength(0);

    expect(getPositions(groupBy)).toEqual([222, 237]);
    expect(getPositions(groupBy, 0)).toEqual([231, 237]);

    expect(getPositions(orderBy)).toEqual([238, 265]);
    const [ordby1, ordby2] = orderBy;
    assert(ordby1 && ordby2);
    expect(getPositions(ordby1)).toEqual([247, 257]);
    expect(getPositions(ordby1, 'columnId')).toEqual([247, 253]);
    expect(getPositions(ordby1, 'type')).toEqual([254, 257]);
    expect(getPositions(ordby2)).toEqual([259, 265]);
    expect(getPositions(ordby2, 'columnId')).toEqual([259, 265]);
    expect(getTokensOf(ordby2, 'type')).toHaveLength(0);

    expect(getTokensOf(query, 'history')).toHaveLength(0);
  });

  test('History query', async () => {
    const queryStr = 'SELECT writetime, field1 FROM appl.table history() WHERE writetime > 888888';
    //                0         10        20        30        40        50        60        70
    const { query, getPositions } = await parseQueryString(queryStr);
    expect(getPositions(query, 'history')).toEqual([41, 48]);
  });

  test('Access tokens using field name for object fields', async () => {
    const queryStr = 'SELECT field1 FROM appl.table history() WHERE field1 > 42 OR field2 = "test"';
    //                0         10        20        30        40        50        60        70
    const { query, getPositions, getTokensOf } = await parseQueryString(queryStr);
    const {
      filter: { nonAggregated },
    } = query;
    assert(nonAggregated);
    const orFilter = nonAggregated.or;
    assert(orFilter);

    expect(getPositions(nonAggregated)).toEqual([46, 76]);
    expect(getTokensOf(nonAggregated, 'or')).toEqual(getTokensOf(orFilter));
    expect(getTokensOf(nonAggregated, 'and')).toHaveLength(0);
    expect(getTokensOf(nonAggregated, 'clause')).toHaveLength(0);
  });

  test('AT clause', async () => {
    const queryStr = "SELECT ORIGINNODE, MVSID FROM KDP.REALTHDA AT('*HUB') WHERE ORIGINNODE = 'IC1A:RSD1:DB2';";
    //                0         10        20        30        40        50        60        70        80
    const tokens = tokenize(queryStr);
    const { statement, problems: parsingProblems } = parseSelectStatement(tokens);
    expect(parsingProblems).toHaveLength(0);
    expect(statement).not.toBeNull();
    throwIfNullish(statement, 'Jest should detect null');

    const { problems } = await convertToMetricsQuery(statement, fakeMetadataLoader);
    expect(problems).toHaveLength(2);
    expect(problems[0]?.message).toEqual(
      'AT clause is generated automatically, any hardcoded AT clause in the formula will be ignored'
    );
    expect(problems).toMatchSnapshot();
  });

  test('WRITETIME filters', async () => {
    const queryStr =
      "SELECT ORIGINNODE, MVSID FROM KDP.REALTHDA WHERE ORIGINNODE = 'IC1A:RSD1:DB2' AND WRITETIME = '123';";
    // 0         10        20        30        40        50        60        70        80        90        100       110
    const qualifiedQueryStr =
      "SELECT ORIGINNODE, MVSID FROM KDP.REALTHDA WHERE ORIGINNODE = 'IC1A:RSD1:DB2' AND REALTHDA.WRITETIME = '123';";
    // 0         10        20        30        40        50        60        70        80        90        100       110

    const expectedMessage =
      'Grafana time range selector should be used to define time range. WRITETIME filters will be ignored';

    const unqualifiedStrTokens = tokenize(queryStr);
    const qualifiedStrTokens = tokenize(qualifiedQueryStr);

    const { statement: unqualifiedStrStatement, problems: unqualifiedStrParsingProblems } =
      parseSelectStatement(unqualifiedStrTokens);
    const { statement: qualifiedStrStatement, problems: qualifiedStrParsingProblems } =
      parseSelectStatement(qualifiedStrTokens);

    expect(unqualifiedStrParsingProblems).toHaveLength(0);
    expect(unqualifiedStrStatement).not.toBeNull();
    throwIfNullish(unqualifiedStrStatement, 'Jest should detect null');
    expect(qualifiedStrParsingProblems).toHaveLength(0);
    expect(qualifiedStrStatement).not.toBeNull();
    throwIfNullish(qualifiedStrStatement, 'Jest should detect null');

    const { problems: unqualifiedStrConversionProblems } = await convertToMetricsQuery(
      unqualifiedStrStatement,
      fakeMetadataLoader
    );
    expect(unqualifiedStrConversionProblems).toHaveLength(2);
    expect(unqualifiedStrConversionProblems[0]?.message).toEqual(expectedMessage);
    expect(unqualifiedStrConversionProblems).toMatchSnapshot();
    const { problems: qualifiedStrConversionProblems } = await convertToMetricsQuery(
      qualifiedStrStatement,
      fakeMetadataLoader
    );
    expect(qualifiedStrConversionProblems).toHaveLength(2);
    expect(qualifiedStrConversionProblems[0]?.message).toEqual(expectedMessage);
    expect(qualifiedStrConversionProblems).toMatchSnapshot();
  });

  test('SYSTEM.PARMA(NODELIST) One node', async () => {
    const queryStr = "SELECT ORIGINNODE FROM KDP.REALTHDA WHERE SYSTEM.PARMA('NODELIST', 'IC1A:RSD1:DB2', 13);";
    // 0         10        20        30        40        50        60        70        80        90        100       110
    const tokens = tokenize(queryStr);
    const { statement, problems: parsingProblems } = parseSelectStatement(tokens);
    expect(parsingProblems).toHaveLength(0);
    expect(statement).not.toBeNull();
    throwIfNullish(statement, 'Jest should detect null');

    const { query, problems } = await convertToMetricsQuery(statement, fakeMetadataLoader);

    const { parmas, agentsAndGroups } = query as MetricsQueryParams;
    assert(parmas);
    assert(agentsAndGroups);

    expect(problems).toHaveLength(0);
    expect(parmas).toHaveLength(0);
    expect(agentsAndGroups).toHaveLength(1);
    expect(agentsAndGroups).toMatchSnapshot();
  });

  test('SYSTEM.PARMA(NODELIST) Two nodes', async () => {
    const queryStr =
      "SELECT ORIGINNODE FROM KDP.REALTHDA WHERE SYSTEM.PARMA('NODELIST', '*MVS_DB2,IBA1:RSD1:DB2', 22);";
    // 0         10        20        30        40        50        60        70        80        90        100       110
    const tokens = tokenize(queryStr);
    const { statement, problems: parsingProblems } = parseSelectStatement(tokens);
    expect(parsingProblems).toHaveLength(0);
    expect(statement).not.toBeNull();
    throwIfNullish(statement, 'Jest should detect null');

    const { query, problems } = await convertToMetricsQuery(statement, fakeMetadataLoader);

    const { parmas, agentsAndGroups } = query as MetricsQueryParams;
    assert(parmas);
    assert(agentsAndGroups);

    expect(problems).toHaveLength(0);
    expect(parmas).toHaveLength(0);
    expect(agentsAndGroups).toHaveLength(2);
    expect(agentsAndGroups).toMatchSnapshot();
  });

  test('SYSTEM.PARMA(NODELIST) Multiple NODELIST', async () => {
    const queryStr =
      "SELECT ORIGINNODE FROM KDP.REALTHDA WHERE SYSTEM.PARMA('NODELIST', '*MVS_DB2,IBA1:RSD1:DB2', 22) AND SYSTEM.PARMA('NODELIST', 'A', 1) AND SYSTEM.PARMA('NODELIST', 'B', 1) AND SYSTEM.PARMA('NODELIST', 'C', 1);";
    // 0         10        20        30        40        50        60        70        80        90        100       110
    const tokens = tokenize(queryStr);
    const { statement, problems: parsingProblems } = parseSelectStatement(tokens);
    expect(parsingProblems).toHaveLength(0);
    expect(statement).not.toBeNull();
    throwIfNullish(statement, 'Jest should detect null');

    const { query, problems } = await convertToMetricsQuery(statement, fakeMetadataLoader);

    const { parmas, agentsAndGroups } = query as MetricsQueryParams;
    assert(parmas);
    assert(agentsAndGroups);

    expect(problems).toHaveLength(4);
    expect(problems).toMatchSnapshot();
    expect(parmas).toHaveLength(0);
    expect(agentsAndGroups).toHaveLength(0);
    expect(agentsAndGroups).toMatchSnapshot();
  });

  test('SYSTEM.PARMA(NODELIST) Nodelist and Originnode', async () => {
    const queryStr =
      "SELECT ORIGINNODE FROM KDP.REALTHDA WHERE SYSTEM.PARMA('NODELIST', '*MVS_DB2,IBA1:RSD1:DB2', 22) AND ORIGINNODE = 'A';";
    // 0         10        20        30        40        50        60        70        80        90        100       110
    const tokens = tokenize(queryStr);
    const { statement, problems: parsingProblems } = parseSelectStatement(tokens);
    expect(parsingProblems).toHaveLength(0);
    expect(statement).not.toBeNull();
    throwIfNullish(statement, 'Jest should detect null');

    const { query, problems } = await convertToMetricsQuery(statement, fakeMetadataLoader);

    const { parmas, agentsAndGroups } = query as MetricsQueryParams;
    assert(parmas);
    assert(agentsAndGroups);

    expect(problems).toHaveLength(1);
    expect(problems).toMatchSnapshot();
    expect(parmas).toHaveLength(0);
    expect(agentsAndGroups).toHaveLength(3);
    expect(agentsAndGroups).toMatchSnapshot();
  });

  test('SYSTEM.PARMA(NODELIST) Nodelist and multiple Originnode', async () => {
    const queryStr =
      "SELECT ORIGINNODE FROM KDP.REALTHDA WHERE (ORIGINNODE = 'A' OR ORIGINNODE = 'B') AND SYSTEM.PARMA('NODELIST', '*MVS_DB2,IBA1:RSD1:DB2', 22);";
    // 0         10        20        30        40        50        60        70        80        90        100       110
    const tokens = tokenize(queryStr);
    const { statement, problems: parsingProblems } = parseSelectStatement(tokens);
    expect(parsingProblems).toHaveLength(0);
    expect(statement).not.toBeNull();
    throwIfNullish(statement, 'Jest should detect null');

    const { query, problems } = await convertToMetricsQuery(statement, fakeMetadataLoader);
    expect(query).not.toBeNull();

    const { parmas, agentsAndGroups } = query as MetricsQueryParams;
    assert(parmas);
    assert(agentsAndGroups);

    expect(problems).toHaveLength(2);
    expect(problems).toMatchSnapshot();
    expect(parmas).toHaveLength(0);
    expect(agentsAndGroups).toHaveLength(4);
    expect(agentsAndGroups).toMatchSnapshot();
  });

  test('SYSTEM.PARMA(NODELIST) Nodelist and simple parma', async () => {
    const queryStr =
      "SELECT ORIGINNODE FROM KDP.REALTHDA WHERE SYSTEM.PARMA('NODELIST', '*MVS_DB2,IBA1:RSD1:DB2', 22) AND SYSTEM.PARMA('SIMPLE', 'Falcon', 6);";
    // 0         10        20        30        40        50        60        70        80        90        100       110
    const tokens = tokenize(queryStr);
    const { statement, problems: parsingProblems } = parseSelectStatement(tokens);
    expect(parsingProblems).toHaveLength(0);
    expect(statement).not.toBeNull();
    throwIfNullish(statement, 'Jest should detect null');

    const { query, problems } = await convertToMetricsQuery(statement, fakeMetadataLoader);
    expect(query).not.toBeNull();

    const { parmas, agentsAndGroups } = query as MetricsQueryParams;
    assert(parmas);
    assert(agentsAndGroups);

    expect(problems).toHaveLength(0);
    expect(parmas).toHaveLength(1);
    expect(parmas).toMatchSnapshot();
    expect(agentsAndGroups).toHaveLength(2);
    expect(agentsAndGroups).toMatchSnapshot();
  });

  test('SYSTEM.PARMA(NODELIST) Nodelist and originnode mapping', async () => {
    const queryStr =
      "SELECT ORIGINNODE FROM KDP.REALTHDA WHERE SYSTEM.PARMA('NODELIST', '*MVS_DB2,IBA1:RSD1:DB2', 22) AND SYSTEM.PARMA('SIMPLE', 'Falcon', 6) AND (ORIGINNODE = 'A' OR ORIGINNODE = 'B');";
    // 0         10        20        30        40        50        60        70        80        90        100       110       120       130       140       150       160       170       180
    const { query, getPositions } = await parseQueryString(queryStr);
    const { agentsAndGroups, parmas } = query;

    expect(getPositions(agentsAndGroups, 0)).toEqual([142, 158]);
    expect(getPositions(agentsAndGroups, 1)).toEqual([162, 178]);
    expect(getPositions(agentsAndGroups, 2)).toEqual([67, 91]);
    expect(getPositions(agentsAndGroups, 3)).toEqual([67, 91]);

    expect(getPositions(parmas)).toEqual([101, 136]);
    const [parma1] = parmas;
    assert(parma1);
    expect(getPositions(parma1)).toEqual([101, 136]);
  });

  test('Unknown application code', async () => {
    const queryStr = 'SELECT ORIGINNODE FROM UNKNOWN.REALTHDA';
    // 0         10        20        30        40        50        60
    const tokens = tokenize(queryStr);
    const { statement, problems: parsingProblems } = parseSelectStatement(tokens);
    expect(parsingProblems).toHaveLength(0);
    expect(statement).not.toBeNull();
    throwIfNullish(statement, 'Jest should detect null');

    const { query, problems } = await convertToMetricsQuery(statement, fakeMetadataLoader);
    expect(query).toBeNull();
    expect(problems).toHaveLength(1);
    expect(problems).toMatchSnapshot();
  });

  test('Unknown table id', async () => {
    const queryStr = 'SELECT ORIGINNODE FROM KDP.UNKNOWN';
    // 0         10        20        30        40        50        60
    const tokens = tokenize(queryStr);
    const { statement, problems: parsingProblems } = parseSelectStatement(tokens);
    expect(parsingProblems).toHaveLength(0);
    expect(statement).not.toBeNull();
    throwIfNullish(statement, 'Jest should detect null');

    const { query, problems } = await convertToMetricsQuery(statement, fakeMetadataLoader);
    expect(query).toBeNull();
    expect(problems).toHaveLength(1);
    expect(problems).toMatchSnapshot();
  });
});
