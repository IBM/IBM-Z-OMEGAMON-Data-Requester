import { MetricsQueryParams } from 'datasource/domain';
import { TokenMapping } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter';
import { MetadataLoader } from 'datasource/features/metadata';

import { validateAffinityId } from './validateAffinityId';
import { validateColumns } from './validateColumns';
import { validateFilters } from './validateFilters';
import { validateTableId } from './validateTableId';
import { validateVariables } from './validateVariables';
import { ValidationProblem } from './validatorCommon';

export function validateAgentsAndGroups(
  queryObject: MetricsQueryParams,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem[] {
  return !queryObject.agentsAndGroups.length
    ? [
        {
          severity: 'error',
          message: 'Query has no agents or groups selected',
          // We dont have specific tokens to highlight in this case, so we highlight entire query
          affectedTokens: getTokensOf?.(queryObject),
        },
      ]
    : [];
}

export async function validateMetricsQuery(
  queryObject: MetricsQueryParams,
  metadataLoader: MetadataLoader,
  getTokensOf?: TokenMapping['getTokensOf']
): Promise<ValidationProblem[]> {
  const affinityIdProblem = await validateAffinityId(queryObject, metadataLoader, getTokensOf);
  if (affinityIdProblem) {
    return [affinityIdProblem];
  }

  const { tableMetadata, problem: tableIdProblem } = await validateTableId(queryObject, metadataLoader, getTokensOf);
  if (tableIdProblem) {
    return [tableIdProblem];
  }

  return [
    ...validateAgentsAndGroups(queryObject, getTokensOf),
    ...validateVariables(queryObject, getTokensOf),
    ...validateColumns(queryObject, tableMetadata, getTokensOf),
    ...validateFilters(queryObject.filter, tableMetadata, getTokensOf),
  ];
}
