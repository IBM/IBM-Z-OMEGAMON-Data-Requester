import {
  updateToLatestVersionSync,
  ValidateUpdaters,
  WithOptionalVersion,
} from 'datasource/features/versioning/common';

import type { CalculateDeltaTransformerOptions as LatestVersionCalculateDeltaTransformerOptions } from 'features/transformers/calculateDeltaTransformer';

import { updateTo_V1 } from './CalculateDeltaTransformerOptions_V1';

const unvalidatedUpdaters = [updateTo_V1] as const;

export const calculateDeltaTransformerOptionsUpdaters: ValidateUpdaters<
  typeof unvalidatedUpdaters,
  LatestVersionCalculateDeltaTransformerOptions
> = unvalidatedUpdaters;

/**
 * @param options calculateDeltaTransformer options of unknown version
 * @returns calculateDeltaTransformer options of latest version
 */
export function updateCalculateDeltaTransformerOptionsToLatestVersion<
  TSomeVersionTransformer extends WithOptionalVersion,
>(options: TSomeVersionTransformer): LatestVersionCalculateDeltaTransformerOptions {
  const latestVersionCalculateDeltaTransformerOptions =
    updateToLatestVersionSync<LatestVersionCalculateDeltaTransformerOptions>(
      options,
      calculateDeltaTransformerOptionsUpdaters,
      undefined
    );
  return latestVersionCalculateDeltaTransformerOptions;
}
