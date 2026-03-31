import { standardTransformersRegistry } from '@grafana/data';

import { getCalculateCounterRateTransformer } from 'features/transformers/calculateCounterRateTransformer';
import { getCalculateDeltaTransformer } from 'features/transformers/calculateDeltaTransformer';
// import { getTakeActionTransformer } from 'features/transformers/takeAction';
// import { getZOsOriginnodeTransformer } from 'features/transformers/zOsOriginnodeTransformer';

// import { getWebhookTransformer } from './webhookTransformer';

export function registerTransformers(): void {
  // standardTransformersRegistry.register(getZOsOriginnodeTransformer());
  standardTransformersRegistry.register(getCalculateDeltaTransformer());
  standardTransformersRegistry.register(getCalculateCounterRateTransformer());
  // standardTransformersRegistry.register(getWebhookTransformer());
}
