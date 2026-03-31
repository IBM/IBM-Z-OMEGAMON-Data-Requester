import {
  updateToLatestVersionSync,
  ValidateUpdaters,
  WithOptionalVersion,
} from 'datasource/features/versioning/common';

import type { ZOsOriginnodeTransformerOptions as LatestVersionZOsOriginnodeOptions } from 'features/transformers/zOsOriginnodeTransformer';

import { updateTo_V1 } from './ZOsOriginnodeTransformerOptions_V1';

const unvalidatedUpdaters = [updateTo_V1] as const;

export const zOsOriginnodeTransformerOptionsUpdaters: ValidateUpdaters<
  typeof unvalidatedUpdaters,
  LatestVersionZOsOriginnodeOptions
> = unvalidatedUpdaters;

/**
 * @param options zOsOriginnodeTransformer options of unknown version
 * @returns zOsOriginnodeTransformer options of latest version
 */
export function updateZOsOriginnodeTransformerOptionsToLatestVersion<
  TSomeVersionTransformer extends WithOptionalVersion,
>(options: TSomeVersionTransformer): LatestVersionZOsOriginnodeOptions {
  const latestVersionZOsOriginnodeTransformerOptions = updateToLatestVersionSync<LatestVersionZOsOriginnodeOptions>(
    options,
    zOsOriginnodeTransformerOptionsUpdaters,
    undefined
  );
  return latestVersionZOsOriginnodeTransformerOptions;
}
