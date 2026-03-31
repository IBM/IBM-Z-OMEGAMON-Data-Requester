import { SUPPORTED_AFFINITIES_FOR_METRICS } from 'public-domain';

import { MetricsQueryParams } from 'datasource/domain';
import { TokenMapping } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter';
import { MetadataLoader } from 'datasource/features/metadata';

import { ValidationProblem } from './validatorCommon';

export async function validateAffinityId(
  queryObject: MetricsQueryParams,
  metadataLoader: MetadataLoader,
  getTokensOf?: TokenMapping['getTokensOf']
): Promise<ValidationProblem | null> {
  const { affinityId } = queryObject;
  const affectedTokens = getTokensOf?.(queryObject, 'affinityId');
  if (!affinityId) {
    return { severity: 'error', message: 'Application is not selected', affectedTokens };
  }

  try {
    const applicationMetadatas = await metadataLoader.getApplicationMetadatas();
    const metadata = applicationMetadatas.find(({ id }) => affinityId === id);
    if (metadata) {
      return null;
    }

    if (SUPPORTED_AFFINITIES_FOR_METRICS[affinityId]) {
      // User is not authorized to see this application, or application is not installed
      return null;
    }

    return { severity: 'error', message: `Application with affinityId "${affinityId}" is unknown`, affectedTokens };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error;
    return {
      severity: 'error',
      message: `Error occurred while getting available application list: ${errorMessage}`,
      affectedTokens,
    };
  }
}
