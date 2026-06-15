import {
  DataQueryResponse,
  DataQueryErrorType,
  ScopedVars,
  DataQueryRequest,
  DataSourceInstanceSettings,
  MetricFindValue,
} from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';
import { isEqual, uniq } from 'lodash';
import { combineWithAnd, errorToString, throwIfNullish, unwrapObservable } from 'public-common';
import { TableMetadata } from 'public-domain';
import { from, map, Observable, switchMap, tap } from 'rxjs';

import {
  FalconQuery,
  FalconDatasourceJsonData,
  EMPTY_PARMA,
  MetricsQueryParma,
  FalconMetricsQuery,
  FalconTimeSeriesQuery,
  MetricsQueryFilter,
  FalconManagedSystemsQuery,
  MetricsQueryFilterClause,
  FalconSituationsQuery,
  AGGREGATION_INTERVAL,
  resolveAutomaticIntervalMinutes,
} from 'datasource/domain';
import { formatMetricsInResponse } from 'datasource/features/formatting/format';
import { convertQueryToItmFormat, ItmFalconMetricsQuery } from 'datasource/features/formatting/reverseFormat';
import { MetadataLoader } from 'datasource/features/metadata';
import { addTakeActionToResponse } from 'datasource/features/takeAction';
import {
  validateMetricsQuery,
  validateTimeSeriesQuery,
  ValidationProblem,
} from 'datasource/features/validation/validateMetricsQuery';
// eslint-disable-next-line import/no-cycle
import {
  applyVariablesInFilters,
  generateFilterFromAdHocs,
  VariableSupport,
  getDatasourceAdHocsFilters,
  getTableIdsFromAdHocs,
  applyVariablesInAgentsAndGroups,
  applyVariablesInParmas,
} from 'datasource/features/variables';
import {
  getRequestWithLatestVersionFalconQueries,
  isFalconQueryOfAnyVersion,
} from 'datasource/features/versioning/falconQuery';
import { AdHocVariableFilter } from 'datasource/grafana';

import { handleManagedSystemsQueries } from './managedSystemsQueryHandler';

export class FalconDatasource extends DataSourceWithBackend<FalconQuery, FalconDatasourceJsonData> {
  private static getErrorResponseObservable(error: unknown): Observable<DataQueryResponse> {
    return new Observable<DataQueryResponse>((observer) => {
      observer.next({
        error: {
          type: DataQueryErrorType.Cancelled,
          message: errorToString(error),
        },
        data: [],
      });
      observer.complete();
    });
  }

  private static applyVariablesInAgentsAndGroups(
    query: FalconMetricsQuery,
    scopedVars: ScopedVars
  ): FalconMetricsQuery {
    const {
      falconParams: { affinityId, agentsAndGroups },
    } = query;

    const processedAgentsAndGroups = applyVariablesInAgentsAndGroups(agentsAndGroups, scopedVars, affinityId);

    const processedQuery: FalconMetricsQuery = {
      ...query,
      falconParams: {
        ...query.falconParams,
        agentsAndGroups: processedAgentsAndGroups,
      },
    };

    return processedQuery;
  }

  private static prepareParmas(query: FalconMetricsQuery, scopedVars: ScopedVars): FalconMetricsQuery {
    const nonEmptyParmas = query.falconParams.parmas.filter((parma) => !isEqual(parma, EMPTY_PARMA));

    const processedParmas: MetricsQueryParma[] = applyVariablesInParmas(nonEmptyParmas, scopedVars);

    const processedQuery: FalconMetricsQuery = {
      ...query,
      falconParams: {
        ...query.falconParams,
        parmas: processedParmas,
      },
    };

    return processedQuery;
  }

  private static applyVariablesInFilters(
    query: FalconMetricsQuery,
    tableMd: TableMetadata,
    scopedVars: ScopedVars
  ): FalconMetricsQuery {
    const filter = applyVariablesInFilters(query.falconParams.filter, tableMd, scopedVars);

    const processedQuery: FalconMetricsQuery = {
      ...query,
      falconParams: {
        ...query.falconParams,
        filter,
      },
    };

    return processedQuery;
  }

  private static applyFiltersFromAdHocs(
    query: FalconMetricsQuery,
    tableMd: TableMetadata,
    adHocVariableFilters: AdHocVariableFilter[]
  ): FalconMetricsQuery {
    const filterFromAdHocs = generateFilterFromAdHocs(adHocVariableFilters, tableMd);

    const nonEmptyFilters = [query.falconParams.filter.nonAggregated, filterFromAdHocs].filter(
      (f): f is MetricsQueryFilter => !!f
    );

    const combined = combineWithAnd<MetricsQueryFilterClause>(...nonEmptyFilters);

    const nonAggregated = combined === 'no_filter' ? undefined : combined;

    const processedQuery: FalconMetricsQuery = {
      ...query,
      falconParams: {
        ...query.falconParams,
        filter: {
          ...query.falconParams.filter,
          nonAggregated,
        },
      },
    };

    return processedQuery;
  }

  private static validateIfQueriesInitialized(request: DataQueryRequest<FalconQuery>): void {
    request.targets.forEach((query) => {
      if (!isFalconQueryOfAnyVersion(query)) {
        throw new Error('Query not initialized');
      }
    });
  }

  readonly metadataLoader;
  override readonly variables = new VariableSupport(this);

  constructor(public instanceSettings: DataSourceInstanceSettings<FalconDatasourceJsonData>) {
    super(instanceSettings);
    this.metadataLoader = new MetadataLoader(this);
  }

  private static prepareMetricsQuery(
    query: FalconMetricsQuery,
    tableMd: TableMetadata,
    adHocVariableFilters: AdHocVariableFilter[],
    scopedVars: ScopedVars,
    isVariableRequest: boolean
  ): ItmFalconMetricsQuery {
    const appliedVariablesQuery = FalconDatasource.applyVariablesInAgentsAndGroups(query, scopedVars);

    const queryWithPreparedParmas = FalconDatasource.prepareParmas(appliedVariablesQuery, scopedVars);

    const queryWithPreparedFilters = FalconDatasource.applyVariablesInFilters(
      queryWithPreparedParmas,
      tableMd,
      scopedVars
    );

    if (isVariableRequest) {
      return {
        ...queryWithPreparedFilters,
        falconParams: convertQueryToItmFormat(queryWithPreparedFilters.falconParams, tableMd),
      };
    }

    const queryWithAppliedAdhocs = FalconDatasource.applyFiltersFromAdHocs(
      queryWithPreparedFilters,
      tableMd,
      adHocVariableFilters
    );

    return {
      ...queryWithAppliedAdhocs,
      falconParams: convertQueryToItmFormat(queryWithAppliedAdhocs.falconParams, tableMd),
    };
  }

  /**
   * For every metrics query removes empty parmas, applies ad hoc filters, applies variables to filters, reverse formats filter values
   */
  private prepareMetricsQueries(
    request: DataQueryRequest<FalconMetricsQuery | FalconSituationsQuery>,
    tableMetadatas: TableMetadata[],
    isVariableRequest: boolean
  ): DataQueryRequest<ItmFalconMetricsQuery | FalconSituationsQuery> {
    const adHocs = getDatasourceAdHocsFilters(this.uid);

    const preparedQueries = request.targets.map((query) => {
      if (query.queryType === 'situations') {
        return query;
      }

      const tableMd = tableMetadatas.find((tMd) => tMd.id === query.falconParams.tableId);

      throwIfNullish(tableMd, `Provided tableMetadatas must contain table metadata for every metrics query in request`);

      const preparedMetricsQuery = FalconDatasource.prepareMetricsQuery(
        query,
        tableMd,
        adHocs,
        request.scopedVars,
        isVariableRequest
      );

      return preparedMetricsQuery;
    });

    const preparedRequest: DataQueryRequest<ItmFalconMetricsQuery | FalconSituationsQuery> = {
      ...request,
      targets: preparedQueries,
    };

    return preparedRequest;
  }

  private validateMetricsQueries = async (request: DataQueryRequest<FalconQuery>): Promise<void> => {
    const validationProblems = await request.targets.reduce(
      async (prev, curr) => {
        if (curr.queryType === 'metrics') {
          const queryValidationProblems = await validateMetricsQuery(curr.falconParams, this.metadataLoader);
          if (queryValidationProblems.length) {
            const allProblems = await prev;
            allProblems.push(...queryValidationProblems);
            return allProblems;
          }
        }
        return prev;
      },
      Promise.resolve([] as ValidationProblem[])
    );

    const validationErrors = validationProblems.filter((problem) => problem.severity === 'error');

    if (validationErrors.length) {
      const errorsString = validationErrors.map(({ message }) => `"${message}"`).join(', ');
      throw new Error(`Found problems in query: ${errorsString}`);
    }
  };

  private async validateTimeSeriesQueries(queries: FalconTimeSeriesQuery[]): Promise<void> {
    const allProblems: ValidationProblem[] = [];
    for (const query of queries) {
      const problems = await validateTimeSeriesQuery(query.falconParams, this.metadataLoader);
      allProblems.push(...problems);
    }

    const validationErrors = allProblems.filter((problem) => problem.severity === 'error');
    if (validationErrors.length) {
      const errorsString = validationErrors.map(({ message }) => `"${message}"`).join(', ');
      throw new Error(`Found problems in query: ${errorsString}`);
    }
  }

  private async getMetricsQueriesTableMetadatas(request: DataQueryRequest<FalconQuery>): Promise<TableMetadata[]> {
    const queriesTableIds = uniq(
      request.targets
        .filter(
          (query): query is FalconMetricsQuery | FalconTimeSeriesQuery =>
            query.queryType === 'metrics' || query.queryType === 'time-series'
        )
        .map((query) => query.falconParams.tableId)
    );

    const tableMetadatas = await this.metadataLoader.getTableMetadatas(queriesTableIds);

    return tableMetadatas;
  }

  /**
   * Prepares time-series query for backend by applying variable interpolation,
   * ad-hoc filters, resolving aggregation interval, and appending WRITETIME to orderBy.
   */
  private static prepareTimeSeriesQuery(
    query: FalconTimeSeriesQuery,
    intervalMs: number,
    tableMd: TableMetadata,
    adHocVariableFilters: AdHocVariableFilter[],
    scopedVars: ScopedVars
  ): FalconTimeSeriesQuery {
    const { falconParams } = query;

    // Apply variable interpolation in agents (includes OMCICS formatting)
    const agentsAndGroups = applyVariablesInAgentsAndGroups(
      falconParams.agentsAndGroups,
      scopedVars,
      falconParams.affinityId
    );

    // Apply variable interpolation in filters
    // Wrap in MetricsQueryFilters so applyVariablesInFilters can process it, then unwrap
    const resolvedFilters = applyVariablesInFilters({ nonAggregated: falconParams.filter }, tableMd, scopedVars);

    // Apply ad-hoc filters
    const filterFromAdHocs = generateFilterFromAdHocs(adHocVariableFilters, tableMd);
    const nonEmptyFilters = [resolvedFilters.nonAggregated, filterFromAdHocs].filter(
      (f): f is MetricsQueryFilter => !!f
    );
    const combined = combineWithAnd<MetricsQueryFilterClause>(...nonEmptyFilters);
    const filter = combined === 'no_filter' ? undefined : combined;

    // Resolve aggregation interval:
    // -1 (AUTOMATIC) → use panel's intervalMs, adjusted for pre-aggregated tables and minimum, then convert to minutes
    // -2 (CUSTOM_UNSET) → fall back to NONE (0); validation prevents reaching this in practice
    // otherwise → use stored value as-is (already in minutes)
    const aggregationIntervalMinutes =
      falconParams.aggregationIntervalMinutes === AGGREGATION_INTERVAL.AUTOMATIC
        ? resolveAutomaticIntervalMinutes(intervalMs)
        : falconParams.aggregationIntervalMinutes === AGGREGATION_INTERVAL.CUSTOM_UNSET
          ? AGGREGATION_INTERVAL.NONE
          : falconParams.aggregationIntervalMinutes;

    return {
      ...query,
      falconParams: {
        ...falconParams,
        agentsAndGroups,
        filter,
        aggregationIntervalMinutes,
        orderBy: [...falconParams.orderBy],
      },
    };
  }

  /**
   * Handles time-series queries by validating, preparing, and sending to the backend.
   * Time-series queries use their own request type; response format is same as metrics.
   */
  private async handleTimeSeriesQueries(
    timeSeriesQueries: FalconTimeSeriesQuery[],
    request: DataQueryRequest<FalconQuery>,
    intervalMs: number,
    panelType?: string
  ): Promise<Observable<DataQueryResponse>> {
    if (timeSeriesQueries.length === 0) {
      return from([{ data: [] }]);
    }

    // Validate time-series queries
    await this.validateTimeSeriesQueries(timeSeriesQueries);

    const timeSeriesRequest: DataQueryRequest<FalconTimeSeriesQuery> = {
      ...request,
      targets: timeSeriesQueries,
    };

    const tableMetadatas = await this.getMetricsQueriesTableMetadatas(
      timeSeriesRequest as DataQueryRequest<FalconQuery>
    );

    const adHocs = getDatasourceAdHocsFilters(this.uid);

    const preparedQueries = timeSeriesQueries.map((query) => {
      const tableMd = tableMetadatas.find((tMd) => tMd.id === query.falconParams.tableId);
      throwIfNullish(tableMd, `Table metadata not found for table id '${query.falconParams.tableId}'`);
      return FalconDatasource.prepareTimeSeriesQuery(query, intervalMs, tableMd, adHocs, request.scopedVars);
    });

    const preparedRequest: DataQueryRequest<FalconTimeSeriesQuery> = {
      ...request,
      targets: preparedQueries,
    };

    // Send time-series queries directly to the backend with their own queryType
    const responseObservable = super.query(preparedRequest as DataQueryRequest<FalconQuery>);

    // Response formatting is the same as metrics
    const formattedResponseObservable = responseObservable.pipe(
      tap((response) => {
        formatMetricsInResponse(
          response,
          tableMetadatas,
          // Cast for formatting - response structure is identical to metrics
          preparedQueries as unknown as FalconMetricsQuery[],
          true
        );
      })
    );

    return formattedResponseObservable;
  }

  private async handleMetricsAndEventsQueries(
    metricsQueries: FalconMetricsQuery[],
    eventsQueries: FalconSituationsQuery[],
    request: DataQueryRequest<FalconQuery>,
    isVariableRequest: boolean,
    panelType?: string
  ): Promise<Observable<DataQueryResponse>> {
    const metricsAndEventsQueries = [...metricsQueries, ...eventsQueries];

    if (metricsAndEventsQueries.length === 0) {
      return from([{ data: [] }]);
    }

    const metricsAndEventsQueryRequest: DataQueryRequest<FalconMetricsQuery | FalconSituationsQuery> = {
      ...request,
      targets: metricsAndEventsQueries,
    };

    await this.validateMetricsQueries(metricsAndEventsQueryRequest);

    const metricsQueriesTableMetadatas = await this.getMetricsQueriesTableMetadatas(metricsAndEventsQueryRequest);

    const itmMetricsAndEventsQueryRequest = this.prepareMetricsQueries(
      metricsAndEventsQueryRequest,
      metricsQueriesTableMetadatas,
      isVariableRequest
    );

    /** Typecast just to make TS happy */
    const typecastItmMetricsAndEventsQueryRequest = itmMetricsAndEventsQueryRequest as DataQueryRequest<
      FalconMetricsQuery | FalconSituationsQuery
    >;

    /**
     * FYI: `super.query`:
     * On internet connection failure or server's 400/500 HTTP status response, etc
     * does not throw error, but rather still returns observable,
     * that emits a value (it emits value, not error!)
     */
    const responseObservable = super.query(typecastItmMetricsAndEventsQueryRequest);

    // For variable requests, return unformatted response. VariableSupport will handle formatting
    if (isVariableRequest) {
      return responseObservable;
    }

    // For panel requests, format and add take action
    const formattedResponseObservable = responseObservable.pipe(
      tap((response) => {
        // FYI: mutates response
        formatMetricsInResponse(response, metricsQueriesTableMetadatas, metricsQueries);
      }),
      switchMap((response) =>
        from(
          addTakeActionToResponse(
            response,
            request,
            this.metadataLoader,
            metricsQueriesTableMetadatas,
            this.instanceSettings.jsonData.adminUrl ?? this.instanceSettings.url ?? '',
            panelType
          )
        )
      )
    );

    return formattedResponseObservable;
  }

  private async queryAndGetFormattedResponseObservable(
    request: DataQueryRequest<FalconQuery>,
    isVariableRequest: boolean,
    panelType?: string
  ): Promise<Observable<DataQueryResponse>> {
    try {
      FalconDatasource.validateIfQueriesInitialized(request);
      const latestVersionRequest = await getRequestWithLatestVersionFalconQueries(request, this.metadataLoader);

      const managedSystemsQueries = latestVersionRequest.targets.filter(
        (query) => query.queryType === 'managedSystems'
      );
      const metricsQueries = latestVersionRequest.targets.filter((query) => query.queryType === 'metrics');
      const eventsQueries = latestVersionRequest.targets.filter((query) => query.queryType === 'situations');
      const timeSeriesQueries = latestVersionRequest.targets.filter((query) => query.queryType === 'time-series');

      const handleManagedSystemsQueriesWrapper = async (): Promise<Observable<DataQueryResponse>> => {
        if (managedSystemsQueries.length === 0) {
          return from([{ data: [] }]);
        }

        const managedSystemsRequest: DataQueryRequest<FalconManagedSystemsQuery> = {
          ...latestVersionRequest,
          targets: managedSystemsQueries,
        };
        return from(handleManagedSystemsQueries(this, managedSystemsRequest));
      };

      const metricsAndEventsResponseObservable = await this.handleMetricsAndEventsQueries(
        metricsQueries,
        eventsQueries,
        latestVersionRequest,
        isVariableRequest,
        panelType
      );
      const timeSeriesResponseObservable = await this.handleTimeSeriesQueries(
        timeSeriesQueries,
        latestVersionRequest,
        request.intervalMs,
        panelType
      );
      const managedSystemsResponseObservable = await handleManagedSystemsQueriesWrapper();

      return managedSystemsResponseObservable.pipe(
        switchMap((managedSystemsResponse) =>
          metricsAndEventsResponseObservable.pipe(
            switchMap((metricsAndEventsResponse) =>
              timeSeriesResponseObservable.pipe(
                map((timeSeriesResponse) => ({
                  ...metricsAndEventsResponse,
                  error: metricsAndEventsResponse.error ?? timeSeriesResponse.error ?? managedSystemsResponse.error,
                  data: [...managedSystemsResponse.data, ...metricsAndEventsResponse.data, ...timeSeriesResponse.data],
                }))
              )
            )
          )
        )
      );
    } catch (err) {
      return FalconDatasource.getErrorResponseObservable(err);
    }
  }

  override query(request: DataQueryRequest<FalconQuery>, isVariableRequest = false): Observable<DataQueryResponse> {
    /**
     * FYI: Why is the code below so confusing (observable inside promise inside observable)?
     * 1. Grafana's `super.query` returns Observable.
     * 2. Observables are awkward to work with.
     * 3. `metrics` queries each provide single response result.
     * 4. THE FOLLOWING IS NOT TRUE as of 2025-11, but in future we may again support events streaming through websockets:
     *    - `situations` queries each provide multiple response results throughout time  (it uses streaming through websockets)
     * 5. Need to handle request that contains both `metrics`, `situations` (events), `managedSystems` queries at same time.
     */
    return unwrapObservable(
      this.queryAndGetFormattedResponseObservable(request, isVariableRequest, request.panelPluginId)
    );
  }

  override getTagKeys(): Promise<MetricFindValue[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override getTagKeys(options: any): Promise<MetricFindValue[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override async getTagKeys(_options?: any): Promise<MetricFindValue[]> {
    const tableIds = getTableIdsFromAdHocs(this.uid);
    const columnNames = await this.metadataLoader.getColumnNamesFromTableIds(tableIds);
    // getTagKeys is called once per variable/datasource so I'm OK with sort function here
    return columnNames.sort().map((columnName) => ({ text: columnName }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override async getTagValues(options: any): Promise<MetricFindValue[]> {
    const tableIds = getTableIdsFromAdHocs(this.uid);
    const columns = await this.metadataLoader.getColumnMetadataForAdHocFilters(tableIds);
    const columnName = options.key as string;
    const { enums = {} } = Object.values(columns).find(({ name }) => columnName === name) ?? {};
    return Object.entries(enums).map(([value, text]) => ({
      value, // This field is ignored by Grafana >_<
      text: `${text}`,
    }));
  }
}
