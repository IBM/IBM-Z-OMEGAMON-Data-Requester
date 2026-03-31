import {
  updateToLatestVersionSync,
  ValidateUpdaters,
  WithOptionalVersion,
} from 'datasource/features/versioning/common';

import type { CalculateCounterRateTransformerOptions as LatestVersionCalculateCounterRateTransformerOptions } from 'features/transformers/calculateCounterRateTransformer';

import { updateTo_V1 } from './CalculateCounterRateTransformerOptions_V1';

const unvalidatedUpdaters = [updateTo_V1] as const;

export const calculateCounterRateTransformerOptionsUpdaters: ValidateUpdaters<
  typeof unvalidatedUpdaters,
  LatestVersionCalculateCounterRateTransformerOptions
> = unvalidatedUpdaters;

/**
 * @param options calculateCounterRateTransformer options of unknown version
 * @returns calculateCounterRateTransformer options of latest version
 */
export function updateCalculateCounterRateTransformerOptionsToLatestVersion<
  TSomeVersionTransformer extends WithOptionalVersion,
>(options: TSomeVersionTransformer): LatestVersionCalculateCounterRateTransformerOptions {
  const latestVersionCalculateCounterRateTransformerOptions =
    updateToLatestVersionSync<LatestVersionCalculateCounterRateTransformerOptions>(
      options,
      calculateCounterRateTransformerOptionsUpdaters,
      undefined
    );
  return latestVersionCalculateCounterRateTransformerOptions;
}
