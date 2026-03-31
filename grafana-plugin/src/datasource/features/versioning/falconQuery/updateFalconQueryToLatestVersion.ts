import { FalconQuery as LatestVersionFalconQuery } from 'datasource/domain';
import { MetadataLoader } from 'datasource/features/metadata';
import { WithOptionalVersion, updateToLatestVersion, ValidateUpdaters } from 'datasource/features/versioning/common';

import { updateToV1 } from './FalconQuery1';
import { updateToV2 } from './FalconQuery2';
import { updateTo_V3 } from './FalconQuery_V3';
import { updateTo_V4 } from './FalconQuery_V4';
import { updateTo_V5 } from './FalconQuery_V5';
import { updateTo_V6 } from './FalconQuery_V6';
import { updateTo_V7 } from './FalconQuery_V7';
import { updateTo_V8 } from './FalconQuery_V8';
import { updateTo_V9 } from './FalconQuery_V9';

const unvalidatedUpdaters = [
  updateToV1,
  updateToV2,
  updateTo_V3,
  updateTo_V4,
  updateTo_V5,
  updateTo_V6,
  updateTo_V7,
  updateTo_V8,
  updateTo_V9,
] as const;

export const falconQueryUpdaters: ValidateUpdaters<typeof unvalidatedUpdaters, LatestVersionFalconQuery> =
  unvalidatedUpdaters;

/**
 * @param query Falcon query of some old version
 * @returns Falcon query of latest version
 */
export async function updateFalconQueryToLatestVersion<TSomeVersionFalconQuery extends WithOptionalVersion>(
  query: TSomeVersionFalconQuery,
  metadataLoader: MetadataLoader
): Promise<LatestVersionFalconQuery> {
  return updateToLatestVersion<LatestVersionFalconQuery, MetadataLoader>(query, falconQueryUpdaters, metadataLoader);
}
