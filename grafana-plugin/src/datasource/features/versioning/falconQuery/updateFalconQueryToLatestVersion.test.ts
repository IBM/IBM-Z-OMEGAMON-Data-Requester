import { ApplicationMetadata, ColumnMetadataMap, TableMetadata } from 'public-domain';

import { FalconMetricsQuery, FalconQuery, FalconSituationsQuery } from 'datasource/domain';
import { MetadataLoader } from 'datasource/features/metadata';

import { falconQueryMocks } from './mocks';
import { updateFalconQueryToLatestVersion } from './updateFalconQueryToLatestVersion';

const fakeMetadataLoader = {
  getApplicationMetadatas: async () => [{ applicationCode: 'APP' } as ApplicationMetadata],
  getTableMetadata: async () =>
    ({
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
      } as unknown as ColumnMetadataMap,
    }) as unknown as TableMetadata,
} as unknown as MetadataLoader;

describe(updateFalconQueryToLatestVersion.name, () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const latestVersionMetricsQuery = falconQueryMocks[falconQueryMocks.length - 1]!.metrics as FalconMetricsQuery;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const latestVersionSituationsQuery = falconQueryMocks[falconQueryMocks.length - 1]!
    .situations as FalconSituationsQuery;

  falconQueryMocks.forEach((queryMocks) => {
    test(`should convert from version ${
      (queryMocks.metrics as FalconQuery).falconVersion ?? 0
    } metrics query to latest`, async () => {
      expect(await updateFalconQueryToLatestVersion(queryMocks.metrics, fakeMetadataLoader)).toEqual(
        latestVersionMetricsQuery
      );
    });

    test(`should convert from version ${
      (queryMocks.situations as FalconQuery).falconVersion ?? 0
    } situations query to latest`, async () => {
      expect(await updateFalconQueryToLatestVersion(queryMocks.situations, fakeMetadataLoader)).toEqual(
        latestVersionSituationsQuery
      );
    });
  });
});
