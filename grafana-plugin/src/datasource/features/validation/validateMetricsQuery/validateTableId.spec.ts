import { TableMetadata } from 'public-domain';

import { MetricsQueryParams } from 'datasource/domain';
import { mockedTableMetadatas, mockedMetadataLoader } from 'datasource/features/metadata/mocks';

import { validateTableId } from './validateTableId';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {
    void 0;
  });
});

test('Validate correct table ID', async () => {
  const correctMockedMetadata = mockedTableMetadatas.find(({ id }) => id === 'REALTHDA');
  expect(correctMockedMetadata).toBeTruthy();
  expect(await validateTableId({ tableId: 'REALTHDA' } as MetricsQueryParams, mockedMetadataLoader)).toEqual({
    tableMetadata: expect.objectContaining({
      id: 'REALTHDA',
    } as TableMetadata),
  });
});

test('Validate incorrect table ID', async () => {
  const validateIncorrectTable = await validateTableId(
    { affinityId: '%IBM.STATIC017', tableId: 'TESTABC' } as MetricsQueryParams,
    mockedMetadataLoader
  );
  expect(validateIncorrectTable.problem?.message).toEqual(
    'Attribute group "TESTABC" for affinityId "%IBM.STATIC017" is not found (Table TESTABC not found). This could be due to connectivity issues or because the attribute group isn\'t supported by any existing agent.'
  );
});
