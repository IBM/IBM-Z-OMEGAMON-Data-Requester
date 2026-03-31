import { SingleFieldOf } from 'public-common';
import { TableMetadata } from 'public-domain';

import { MetricsQueryParams } from 'datasource/domain';
import { TokenMapping } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter';
import { MetadataLoader } from 'datasource/features/metadata';

import { ValidationProblem } from './validatorCommon';

export async function validateTableId(
  queryObject: MetricsQueryParams,
  metadataLoader: MetadataLoader,
  getTokensOf?: TokenMapping['getTokensOf']
): Promise<
  SingleFieldOf<{
    tableMetadata: TableMetadata;
    problem: ValidationProblem;
  }>
> {
  if (!queryObject.tableId) {
    return {
      problem: {
        severity: 'error',
        message: 'Table ID not specified',
        affectedTokens: getTokensOf?.(queryObject, 'tableId'),
      },
    };
  }
  try {
    return { tableMetadata: await metadataLoader.getTableMetadata(queryObject.tableId) };
  } catch (error) {
    const errText = error instanceof Error ? error.message : 'unknown';
    return {
      problem: {
        severity: 'error',
        message: `Attribute group "${queryObject.tableId}" for affinityId "${queryObject.affinityId}" is not found (${errText}). This could be due to connectivity issues or because the attribute group isn't supported by any existing agent.`,
        affectedTokens: getTokensOf?.(queryObject, 'tableId'),
      },
    };
  }
}
