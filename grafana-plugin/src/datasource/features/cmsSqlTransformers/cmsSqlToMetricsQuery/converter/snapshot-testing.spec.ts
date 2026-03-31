import { RecursivePartial } from 'public-common';
import { TableMetadata } from 'public-domain';

import { queries } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery';
import { parseSelectStatement } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';
import { tokenize } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';
import { MetadataLoader } from 'datasource/features/metadata';
import { mockedApplicationMetadatas } from 'datasource/features/metadata/mocks';

import { convertToMetricsQuery } from './convertToMetricsQuery';

const fakeTableMetadatas: Array<RecursivePartial<TableMetadata>> = [
  {
    applicationCode: 'APP',
    id: 'TABLE',
    columns: {
      COL1: { id: 'COL1', type: 'number' },
      COL2: { id: 'COL2', type: 'number' },
      COL3: { id: 'COL3', type: 'number' },
      COL4: { id: 'COL4', type: 'number' },
      COL5: { id: 'COL5', type: 'number' },
      COL6: { id: 'COL6', type: 'number' },
      COL7: { id: 'COL7', type: 'number' },
    },
  },
  {
    applicationCode: 'KDP',
    id: 'REALTHDA',
    columns: {
      ORIGINNODE: { id: 'ORIDINNODE', type: 'string' },
      TDIDASID: { id: 'TDIDASID', type: 'number' },
      THDXGETP: { id: 'THDXGETP', type: 'number' },
    },
  },
  {
    applicationCode: 'KM5',
    id: 'ASCPUUTIL',
    columns: {
      JCPUTM: { id: 'JCPUTM', type: 'number', scaleFactor: 2 },
      JPROGRESS: { id: 'JPROGRESS', type: 'number', enums: { 0: 'Yes', 1: 'No' } },
    },
  },
  {
    applicationCode: 'O4SRV',
    id: 'CCT',
    columns: {
      CMD: { id: 'CMD', type: 'string' },
    },
  },
  {
    applicationCode: 'O4SRV',
    id: 'TADVISOR',
    columns: {
      ORIGINNODE: { id: 'ORIGINNODE', type: 'string' },
    },
  },
  {
    applicationCode: 'O4SRV',
    id: 'INODESTS',
    columns: {
      NODE: { id: 'NODE', type: 'string' },
      ORIGINNODE: { id: 'ORIGINNODE', type: 'string' },
      PRODUCT: { id: 'PRODUCT', type: 'string' },
      O4ONLINE: { id: 'O4ONLINE', type: 'string' },
      AFFINITIES: { id: 'AFFINITIES', type: 'string' },
      KEY: { id: 'KEY', type: 'string' },
    },
  },
];

const fakeMetadataLoader = {
  getApplicationMetadatas: async () => mockedApplicationMetadatas,
  getTableMetadata: async (tableId: string) => {
    return fakeTableMetadatas.find((tableMd) => tableMd.id === tableId);
  },
} as unknown as MetadataLoader;

queries.forEach((_queryStr) => {
  test(_queryStr, async () => {
    const { statement } = parseSelectStatement(tokenize(_queryStr));
    if (!statement) {
      expect({
        _queryStr,
        result: null,
        problem: 'AST is not parsed',
      }).toMatchSnapshot();
      return;
    }

    const { query: result, problems } = await convertToMetricsQuery(statement, fakeMetadataLoader);
    expect({
      _queryStr,
      result,
      problems,
    }).toMatchSnapshot();
  });
});
