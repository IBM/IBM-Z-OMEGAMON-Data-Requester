import { TypedVariableModel } from '@grafana/data';

// eslint-disable-next-line import/no-internal-modules
import { parseQueryString } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter/convertToMetricsQuery.spec';

import { validateVariables } from './validateVariables';

const query_var = {
  id: 'query_var',
  rootStateKey: 'e1fc6e0f-f301-42b4-8168-e5f41f7b16f6',
  name: 'query_var',
  type: 'query',
  global: false,
  index: 1,
  hide: 0,
  skipUrlSync: false,
  state: 'Done',
  error: null,
  description: null,
  datasource: null,
  query: {
    queryType: 'metrics',
    version: '0.1.0',
    refId: 'A',
    hide: false,
    params: {
      affinityId: '%IBM.STATIC017',
      applicationCode: 'KDP',
      tableId: 'ANOMALY',
      columns: [{ id: 'CPUFACT' }],
      agentsAndGroups: ['DB2plex:DB2plex:Plexview', 'DBA9:RS28:DB2', 'DDS9:DB2plex:DSGROUP'],
      history: false,
      filter: {},
      orderBy: [],
      groupBy: [],
      params: [],
      first: 100,
    },
  },
  regex: '',
  sort: 0,
  refresh: 1,
  multi: false,
  includeAll: false,
  allValue: null,
  options: [{ text: 'None', value: '', isNone: true, selected: true }],
  current: { text: 'None', value: '', isNone: true, selected: false },
  definition: '',
};

const adhoc_var = {
  datasource: { type: 'rocketsoftware-omegamon-datasource', uid: 'b506e3d3-ee0d-4301-8ee2-0224f46dd38a' },
  filters: [],
  hide: 0,
  name: 'adhoc_var',
  skipUrlSync: false,
  type: 'adhoc',
  rootStateKey: 'e1fc6e0f-f301-42b4-8168-e5f41f7b16f6',
  id: 'adhoc_var',
  global: false,
  index: 0,
  state: 'Done',
  error: null,
  description: null,
};

jest.mock('@grafana/runtime', () => ({
  getTemplateSrv: () => ({
    getVariables: () => {
      return [adhoc_var, query_var] as TypedVariableModel[];
    },
  }),
}));

test('Validate variables, only correct variables', async () => {
  const queryStr = 'SELECT field1 FROM appl.table WHERE (originnode = "${query_var}" OR originnode = "$query_var")';

  const { query, getTokensOf } = await parseQueryString(queryStr);
  const result = validateVariables(query, getTokensOf);

  expect(result).toHaveLength(0);
});

test('Validate variables, only incorrect variables', async () => {
  const queryStr = 'SELECT field1 FROM appl.table WHERE (originnode = "${error}" OR originnode = "$error")';

  const { query, getTokensOf } = await parseQueryString(queryStr);
  const result = validateVariables(query, getTokensOf);

  expect(result).toHaveLength(2);
  expect(result).toMatchSnapshot();
});

test('Validate variables, both correct and incorrect variables', async () => {
  const queryStr = 'SELECT field1 FROM appl.table WHERE (originnode = "${query_var}" OR originnode = "$error")';

  const { query, getTokensOf } = await parseQueryString(queryStr);
  const result = validateVariables(query, getTokensOf);

  expect(result).toHaveLength(1);
  expect(result).toMatchSnapshot();
});

test('Validate variables, adhoc and incorrect variables', async () => {
  const queryStr = 'SELECT field1 FROM appl.table WHERE (originnode = "${adhoc_var}" OR originnode = "$error")';

  const { query, getTokensOf } = await parseQueryString(queryStr);
  const result = validateVariables(query, getTokensOf);

  expect(result).toHaveLength(2);
  expect(result).toMatchSnapshot();
});

test('Validate variables, only adhoc variables', async () => {
  const queryStr = 'SELECT field1 FROM appl.table WHERE (originnode = "${adhoc_var}" OR originnode = "$adhoc_var")';

  const { query, getTokensOf } = await parseQueryString(queryStr);
  const result = validateVariables(query, getTokensOf);

  expect(result).toHaveLength(2);
  expect(result).toMatchSnapshot();
});

test('Validate variables, error in system.parma', async () => {
  const queryStr =
    'SELECT field1 FROM appl.table WHERE system.parma("A", "${error}", 8) AND system.parma("A", "${adhoc_var}", 8)';

  const { query, getTokensOf } = await parseQueryString(queryStr);
  const result = validateVariables(query, getTokensOf);

  expect(result).toHaveLength(2);
  expect(result).toMatchSnapshot();
});
test('Validate variables, error in filter', async () => {
  const queryStr = 'SELECT field1 FROM appl.table WHERE field1 = "${error}" AND field1 = "${adhoc_var}"';
  const { query, getTokensOf } = await parseQueryString(queryStr);
  const result = validateVariables(query, getTokensOf);

  expect(result).toHaveLength(2);
  expect(result).toMatchSnapshot();
});

test('Validate variables, error in managed systems', async () => {
  const queryStr = 'SELECT YTH FROM appl.table FIRST (100) WHERE SYSTEM.PARMA("NODELIST", "${error},${adhoc_var}", 21)';

  const { query, getTokensOf } = await parseQueryString(queryStr);
  const result = validateVariables(query, getTokensOf);

  expect(result).toHaveLength(2);
  expect(result).toMatchSnapshot();
});

test('Validate variables, variables are not alloed in SYSTEM.PARMA Name', async () => {
  const queryStr = 'SELECT YTH FROM appl.table FIRST (100) WHERE SYSTEM.PARMA("${query_var}", "falcon", 6)';

  const { query, getTokensOf } = await parseQueryString(queryStr);
  const result = validateVariables(query, getTokensOf);

  expect(result).toHaveLength(1);
  expect(result).toMatchSnapshot();
});
