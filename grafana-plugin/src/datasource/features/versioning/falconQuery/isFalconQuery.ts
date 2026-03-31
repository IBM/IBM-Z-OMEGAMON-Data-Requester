import { DataQuery } from '@grafana/schema';
import { isNumber } from 'lodash';

import { FalconQuery, FALCON_QUERY_VERSION as FALCON_QUERY_VERSION_LATEST } from 'datasource/domain';
import { WithVersion } from 'datasource/features/versioning/common';

import { FalconQuery0 } from './FalconQuery0';

export function isFalconQueryOfAnyVersion(query: unknown): query is DataQuery & WithVersion {
  if (query == null || typeof query !== 'object') {
    return false;
  }

  if ('falconVersion' in query) {
    const { falconVersion } = query;
    return isNumber(falconVersion);
  }

  // If no `falconVersion`, query may be v0
  const v0QueryTypes: Array<FalconQuery0['queryType']> = ['regular', 'situations'];
  if (v0QueryTypes.includes((query as FalconQuery0).queryType)) {
    return true;
  }

  return false;
}

export function isFalconQueryLatestVersion(query: unknown): query is FalconQuery {
  if (!isFalconQueryOfAnyVersion(query)) {
    return false;
  }

  const { falconVersion } = query;
  if (falconVersion > FALCON_QUERY_VERSION_LATEST) {
    throw new Error('Query version is higher than supported');
  }
  return falconVersion === FALCON_QUERY_VERSION_LATEST;
}
