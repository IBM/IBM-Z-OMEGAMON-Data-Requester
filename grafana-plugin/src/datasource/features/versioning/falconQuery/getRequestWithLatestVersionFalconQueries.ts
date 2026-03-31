import { DataQueryRequest } from '@grafana/data';

import { FalconQuery } from 'datasource/domain';
import { MetadataLoader } from 'datasource/features/metadata';

import { updateFalconQueryToLatestVersion } from './updateFalconQueryToLatestVersion';

export async function getRequestWithLatestVersionFalconQueries(
  request: DataQueryRequest<FalconQuery>,
  metadataLoader: MetadataLoader
): Promise<DataQueryRequest<FalconQuery>> {
  const latestVersionFalconQueries = await Promise.all(
    request.targets.map((queryOfUnknownVersion) =>
      updateFalconQueryToLatestVersion(queryOfUnknownVersion, metadataLoader)
    )
  );

  const requestWithLatestVersionQueries: DataQueryRequest<FalconQuery> = {
    ...request,
    targets: latestVersionFalconQueries,
  };

  return requestWithLatestVersionQueries;
}
