import { AGGREGATION_INTERVAL, MetricsQueryParams, TimeSeriesQueryParams } from 'datasource/domain';
import { flattenFilterClauses } from 'datasource/domain/filters';
import { MetadataLoader } from 'datasource/features/metadata';

import { validateAffinityId } from './validateAffinityId';
import { validateTableId } from './validateTableId';
import { validateManagedSystems, validateVariableInValue } from './validateVariables';
import { ValidationProblem } from './validatorCommon';

function validateAgents(queryObject: TimeSeriesQueryParams): ValidationProblem[] {
  return !queryObject.agentsAndGroups?.length
    ? [{ severity: 'error', message: 'Query has no agents or groups selected' }]
    : [];
}

function validateAggregationInterval(queryObject: TimeSeriesQueryParams): ValidationProblem[] {
  if (queryObject.aggregationIntervalMinutes === AGGREGATION_INTERVAL.CUSTOM_UNSET) {
    return [{ severity: 'error', message: 'Custom aggregation interval value is required' }];
  }
  return [];
}

export function validateMetrics(queryObject: TimeSeriesQueryParams): ValidationProblem[] {
  return !queryObject.columns?.length ? [{ severity: 'error', message: 'At least one metric must be selected' }] : [];
}

function validateLimitValue(queryObject: TimeSeriesQueryParams): ValidationProblem[] {
  if (
    queryObject.orderBy !== undefined &&
    queryObject.orderBy.length > 0 &&
    (queryObject.limit === undefined || queryObject.limit < 1)
  ) {
    return [{ severity: 'error', message: 'Limit is required when Rank by is set' }];
  }
  return [];
}

function validateRankByValue(queryObject: TimeSeriesQueryParams): ValidationProblem[] {
  if (queryObject.limit !== undefined && (queryObject.orderBy === undefined || queryObject.orderBy.length === 0)) {
    return [{ severity: 'error', message: 'Rank by is required when Limit is set' }];
  }
  return [];
}

function validateFilterVariables(filter: TimeSeriesQueryParams['filter']): ValidationProblem[] {
  const clauses = flattenFilterClauses(filter ?? null);
  return clauses.flatMap((clause) => validateVariableInValue(clause.userDefinedValue));
}

export async function validateTimeSeriesQuery(
  queryObject: TimeSeriesQueryParams,
  metadataLoader: MetadataLoader
): Promise<ValidationProblem[]> {
  // validateAffinityId and validateTableId only access affinityId and tableId fields
  const sharedFields = queryObject as Pick<MetricsQueryParams, 'affinityId' | 'tableId'> as MetricsQueryParams;

  const affinityIdProblem = await validateAffinityId(sharedFields, metadataLoader);
  if (affinityIdProblem) {
    return [affinityIdProblem];
  }

  const { problem: tableIdProblem } = await validateTableId(sharedFields, metadataLoader);
  if (tableIdProblem) {
    return [tableIdProblem];
  }

  return [
    ...validateAgents(queryObject),
    ...validateAggregationInterval(queryObject),
    ...validateMetrics(queryObject),
    ...validateLimitValue(queryObject),
    ...validateRankByValue(queryObject),
    ...validateManagedSystems(queryObject.agentsAndGroups),
    ...validateFilterVariables(queryObject.filter),
  ];
}
