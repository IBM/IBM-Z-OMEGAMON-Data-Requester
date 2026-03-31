import { TableMetadata, WRITETIME_COLUMN_ID } from 'public-domain';

import { MetricsQueryOrderByItem, MetricsQueryParams } from 'datasource/domain';
import { mockedTableMetadatas } from 'datasource/features/metadata/mocks';

import { validateColumns } from './validateColumns';
import { inappropriateWritetimeColumnMessage } from './validatorCommon';

const columns = [
  {
    id: 'TIMESTAMP',
  },
  {
    id: 'MVSID',
  },
  {
    id: 'SSID',
  },
  {
    id: 'ENCLCPUT',
  },
  {
    id: 'ENCLPER_P_',
  },
  {
    id: 'ENCLPIDX',
  },
];
const metadata = mockedTableMetadatas.find(({ id }) => id === 'REALTHDA') as TableMetadata;

test('Validate correct columns', () => {
  expect(
    validateColumns(
      {
        columns,
        history: true,
        groupBy: [] as string[],
        orderBy: [] as MetricsQueryOrderByItem[],
      } as MetricsQueryParams,
      metadata
    )
  ).toHaveLength(0);
  expect(
    validateColumns(
      {
        columns,
        history: false,
        groupBy: [] as string[],
        orderBy: [] as MetricsQueryOrderByItem[],
      } as MetricsQueryParams,
      metadata
    )
  ).toHaveLength(0);
  expect(
    validateColumns(
      {
        columns: [...columns, { id: WRITETIME_COLUMN_ID }],
        history: true,
        groupBy: [] as string[],
        orderBy: [] as MetricsQueryOrderByItem[],
      } as MetricsQueryParams,
      metadata
    ).filter(({ message }) => message === inappropriateWritetimeColumnMessage)
  ).toHaveLength(0);
});

test('Validate columns not found in metadata', () => {
  const incorrectColumns = [...columns, { id: 'TESTABCD' }];
  expect(
    validateColumns(
      {
        columns: incorrectColumns,
        history: true,
        groupBy: [] as string[],
        orderBy: [] as MetricsQueryOrderByItem[],
      } as MetricsQueryParams,
      metadata
    ).filter(({ message }) => message === 'Column "TESTABCD" not found in table "KDP.REALTHDA"')
  ).toHaveLength(1);
  expect(
    validateColumns(
      {
        columns: incorrectColumns,
        history: false,
        groupBy: [] as string[],
        orderBy: [] as MetricsQueryOrderByItem[],
      } as MetricsQueryParams,
      metadata
    ).filter(({ message }) => message === 'Column "TESTABCD" not found in table "KDP.REALTHDA"')
  ).toHaveLength(1);
});

test('Validate WRITETIME column in non historical query', () => {
  expect(
    validateColumns(
      {
        columns: [...columns, { id: WRITETIME_COLUMN_ID }],
        history: false,
        groupBy: [] as string[],
        orderBy: [] as MetricsQueryOrderByItem[],
      } as MetricsQueryParams,
      metadata
    ).filter(({ message }) => message === inappropriateWritetimeColumnMessage)
  ).toHaveLength(1);
});

test('Test correct group by usage', () => {
  expect(
    validateColumns(
      {
        columns: [
          { id: 'VLUNAME', aggregationFunction: 'COUNT' },
          { id: 'THWTTOTW', aggregationFunction: 'AVG' },
          { id: 'TIMESTAMP', aggregationFunction: 'MIN' },
          { id: WRITETIME_COLUMN_ID, aggregationFunction: 'MAX' },
        ],
        groupBy: ['VLUNAME'],
        orderBy: [] as MetricsQueryOrderByItem[],
        history: true,
      } as MetricsQueryParams,
      mockedTableMetadatas.find(({ id }) => id === 'REALTHDA') as TableMetadata
    )
  ).toHaveLength(0);
});

test('Test group by with no aggregation function', () => {
  expect(
    validateColumns(
      {
        columns: [{ id: 'VLUNAME' }, { id: 'THWTTOTW' }, { id: 'TIMESTAMP' }, { id: WRITETIME_COLUMN_ID }],
        groupBy: ['VLUNAME'],
        orderBy: [] as MetricsQueryOrderByItem[],
        history: true,
      } as MetricsQueryParams,
      mockedTableMetadatas.find(({ id }) => id === 'REALTHDA') as TableMetadata
    ).filter(
      ({ message }) => message === 'GROUP BY clause is present but no aggregation functions are found in SELECT clause'
    )
  ).toHaveLength(1);
});

test('Test banned aggregation functions for types', () => {
  expect(
    validateColumns(
      {
        columns: [{ id: 'VLUNAME', aggregationFunction: 'AVG' }],
        groupBy: ['VLUNAME'],
        orderBy: [] as MetricsQueryOrderByItem[],
        history: false,
      } as MetricsQueryParams,
      mockedTableMetadatas.find(({ id }) => id === 'REALTHDA') as TableMetadata
    ).filter(
      ({ message }) =>
        message === 'Aggregation function "AVG" is not compatible with column type "string" for column "VLUNAME"'
    )
  ).toHaveLength(1);
  expect(
    validateColumns(
      {
        columns: [{ id: 'TIMESTAMP', aggregationFunction: 'AVG' }],
        groupBy: ['TIMESTAMP'],
        orderBy: [] as MetricsQueryOrderByItem[],
        history: false,
      } as MetricsQueryParams,
      mockedTableMetadatas.find(({ id }) => id === 'REALTHDA') as TableMetadata
    ).filter(
      ({ message }) =>
        message ===
        'Aggregation function "AVG" is not compatible with column type "itmTimestamp" for column "TIMESTAMP"'
    )
  ).toHaveLength(1);
});

test('Validate WRITETIME in GROUP BY only in historical query', () => {
  expect(
    validateColumns(
      {
        columns: [
          { id: 'VLUNAME', aggregationFunction: 'COUNT' },
          { id: 'THWTTOTW', aggregationFunction: 'AVG' },
          { id: 'TIMESTAMP', aggregationFunction: 'MIN' },
          { id: WRITETIME_COLUMN_ID, aggregationFunction: 'MAX' },
        ],
        groupBy: [WRITETIME_COLUMN_ID],
        orderBy: [] as MetricsQueryOrderByItem[],
        history: false,
      } as MetricsQueryParams,
      mockedTableMetadatas.find(({ id }) => id === 'REALTHDA') as TableMetadata
    ).filter(({ message }) => message === inappropriateWritetimeColumnMessage)
  ).toHaveLength(2);
});

test('Validate GROUP BY columns against metadata', () => {
  const validate = validateColumns(
    {
      columns: [
        { id: 'VLUNAME', aggregationFunction: 'COUNT' },
        { id: 'THWTTOTW', aggregationFunction: 'AVG' },
        { id: 'TIMESTAMP', aggregationFunction: 'MIN' },
        { id: WRITETIME_COLUMN_ID, aggregationFunction: 'MAX' },
      ],
      groupBy: [WRITETIME_COLUMN_ID, 'BLABLA', '$DUMMY'],
      orderBy: [] as MetricsQueryOrderByItem[],
      history: false,
      tableId: 'REALTHDA',
    } as MetricsQueryParams,
    mockedTableMetadatas.find(({ id }) => id === 'REALTHDA') as TableMetadata
  );
  expect(
    validate.filter(
      ({ message }) =>
        message ===
        'Attribute "BLABLA" in attribute group "KDP.REALTHDA" isn\'t supported by any existing agents and cannot be used in GROUP BY clause.'
    )
  ).toHaveLength(1);
  expect(
    validate.filter(({ message }) => message === 'Column "WRITETIME" is not found in table "REALTHDA"')
  ).toHaveLength(0);
  expect(validate.filter(({ message }) => message === 'Column "$DUMMY" is not found in table "REALTHDA"')).toHaveLength(
    0
  );
});

test('Validate case of column being in SELECT but not in GROUP BY without aggregation function', () => {
  expect(
    validateColumns(
      {
        columns: [
          { id: 'VLUNAME', aggregationFunction: 'COUNT' },
          { id: 'THWTTOTW', aggregationFunction: 'AVG' },
          { id: 'TIMESTAMP', aggregationFunction: 'MIN' },
          { id: WRITETIME_COLUMN_ID, aggregationFunction: 'MAX' },
          { id: 'WHNDBTIM' },
        ],
        groupBy: [WRITETIME_COLUMN_ID],
        orderBy: [] as MetricsQueryOrderByItem[],
        history: false,
      } as MetricsQueryParams,
      mockedTableMetadatas.find(({ id }) => id === 'REALTHDA') as TableMetadata
    ).filter(
      ({ message }) => message === 'Column "WHNDBTIM" is in SELECT without aggregation function and is not in GROUP BY'
    )
  ).toHaveLength(1);
});

test('Validate order by', () => {
  expect(
    validateColumns(
      {
        columns: [
          { id: 'VLUNAME', aggregationFunction: 'COUNT' },
          { id: 'THWTTOTW', aggregationFunction: 'AVG' },
          { id: 'TIMESTAMP', aggregationFunction: 'MIN' },
          { id: WRITETIME_COLUMN_ID, aggregationFunction: 'MAX' },
        ],
        groupBy: [WRITETIME_COLUMN_ID],
        orderBy: [{ columnId: 'VLUNAME' }, { columnId: WRITETIME_COLUMN_ID }] as MetricsQueryOrderByItem[],
        history: true,
      } as MetricsQueryParams,
      mockedTableMetadatas.find(({ id }) => id === 'REALTHDA') as TableMetadata
    )
  ).toHaveLength(0);

  expect(
    validateColumns(
      {
        columns: [
          { id: 'VLUNAME', aggregationFunction: 'COUNT' },
          { id: 'THWTTOTW', aggregationFunction: 'AVG' },
          { id: 'TIMESTAMP', aggregationFunction: 'MIN' },
        ],
        groupBy: [] as string[],
        orderBy: [{ columnId: 'VLUNAME' }, { columnId: WRITETIME_COLUMN_ID }] as MetricsQueryOrderByItem[],
        history: false,
      } as MetricsQueryParams,
      mockedTableMetadatas.find(({ id }) => id === 'REALTHDA') as TableMetadata
    ).filter(({ message }) => message === inappropriateWritetimeColumnMessage)
  ).toHaveLength(1);

  expect(
    validateColumns(
      {
        columns: [
          { id: 'VLUNAME', aggregationFunction: 'COUNT' },
          { id: 'THWTTOTW', aggregationFunction: 'AVG' },
          { id: 'TIMESTAMP', aggregationFunction: 'MIN' },
        ],
        groupBy: [] as string[],
        orderBy: [{ columnId: 'BLA' }] as MetricsQueryOrderByItem[],
        history: false,
      } as MetricsQueryParams,
      mockedTableMetadatas.find(({ id }) => id === 'REALTHDA') as TableMetadata
    ).filter(
      ({ message }) =>
        message ===
        'Attribute "BLA" in attribute group "KDP.REALTHDA" isn\'t supported by any existing agents and cannot be used in ORDER BY clause.'
    )
  ).toHaveLength(1);
});
