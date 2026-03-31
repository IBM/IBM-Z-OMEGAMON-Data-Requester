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
import { from, Observable, switchMap, tap } from 'rxjs';

import {
  FalconQuery,
  FalconDatasourceJsonData,
  EMPTY_PARMA,
  MetricsQueryParma,
  FalconMetricsQuery,
  MetricsQueryFilter,
  FalconSituationsQuery,
  MetricsQueryFilterClause,
} from 'datasource/domain';
import { formatMetricsInResponse } from 'datasource/features/formatting/format';
import { ItmQueryParams, convertQueryToItmFormat } from 'datasource/features/formatting/reverseFormat';
import { MetadataLoader } from 'datasource/features/metadata';
import { addTakeActionToResponse } from 'datasource/features/takeAction';
import { validateMetricsQuery, ValidationProblem } from 'datasource/features/validation/validateMetricsQuery';
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

type PreparedFalconMetricsQuery = Omit<FalconMetricsQuery, 'falconParams'> & { falconParams: ItmQueryParams };
type PreparedDataQuery = PreparedFalconMetricsQuery | FalconSituationsQuery;

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
  ): PreparedFalconMetricsQuery {
    const applyedVariablesQuery = FalconDatasource.applyVariablesInAgentsAndGroups(query, scopedVars);

    const queryWithPreparedParmas = FalconDatasource.prepareParmas(applyedVariablesQuery, scopedVars);

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

    const queryWithApplyedAdhocs = FalconDatasource.applyFiltersFromAdHocs(
      queryWithPreparedFilters,
      tableMd,
      adHocVariableFilters
    );

    return {
      ...queryWithApplyedAdhocs,
      falconParams: convertQueryToItmFormat(queryWithApplyedAdhocs.falconParams, tableMd),
    };
  }

  /**
   * Removes empty parmas, applies ad hoc filters, applies variables to filters, reverse formats filter values
   */
  private prepareMetricsQueries(
    request: DataQueryRequest<FalconQuery>,
    tableMetadatas: TableMetadata[],
    isVariableRequest: boolean
  ): DataQueryRequest<PreparedDataQuery> {
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

    const preparedRequest: DataQueryRequest<PreparedDataQuery> = { ...request, targets: preparedQueries };

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

  private async getMetricsQueriesTableMetadatas(request: DataQueryRequest<FalconQuery>): Promise<TableMetadata[]> {
    const queriesTableIds = uniq(
      request.targets
        .filter((query): query is FalconMetricsQuery => query.queryType === 'metrics')
        .map((query) => query.falconParams.tableId)
    );

    const tableMetadatas = await this.metadataLoader.getTableMetadatas(queriesTableIds);

    return tableMetadatas;
  }

  private async queryAndGetFormattedResponseObservable(
    request: DataQueryRequest<FalconQuery>,
    isVariableRequest: boolean,
    panelType?: string
  ): Promise<Observable<DataQueryResponse>> {
    try {
      FalconDatasource.validateIfQueriesInitialized(request);
      const latestVersionRequest = await getRequestWithLatestVersionFalconQueries(request, this.metadataLoader);

      await this.validateMetricsQueries(latestVersionRequest);

      const metricsQueriesTableMetadatas = await this.getMetricsQueriesTableMetadatas(latestVersionRequest);

      const metricsQueryRequest = this.prepareMetricsQueries(
        latestVersionRequest,
        metricsQueriesTableMetadatas,
        isVariableRequest
      );

      /**
       * FYI: typecasting
       * We modify query object before we send it to datasource backend (to resolve formatting, enums, etc).
       * Grafana doesn't allow us to define those 2 different types so 'super.query' takes FalconQuery type.
       * Because of that, we just going to cast it
       */
      const queryRequest = metricsQueryRequest as DataQueryRequest<FalconMetricsQuery>;

      /**
       * FYI: `super.query`:
       * On internet connection failure or server's 400/500 HTTP status response, etc
       * does not throw error, but rather still returns observable,
       * that emits a value (it emits value, not error!)
       */
      const responseObservable = super.query(queryRequest);

      const formattedResponseObservable = await responseObservable.pipe(
        tap((response) => {
          // FYI: mutates response
          formatMetricsInResponse(response, metricsQueriesTableMetadatas);
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
     * 4. `situations` queries each provide multiple response results throughout time
     *    (it uses streaming through websockets).
     * 5. Need to handle request that contains both `metrics` and `situations` queries at same time.
     */
    return unwrapObservable(
      this.queryAndGetFormattedResponseObservable(request, isVariableRequest, request.panelPluginId)
    );
  }

  override async getTagKeys(): Promise<MetricFindValue[]> {
    const tableIds = getTableIdsFromAdHocs(this.uid);
    const columnNames = await this.metadataLoader.getColumnNamesFromTableIds(tableIds);
    // getTagKeys is called once per variable/datasource so I'm OK with sort function here
    return columnNames.sort().map((columnName) => ({ text: columnName }));
  }

  // Grafana's function is overriden and any comes from it
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
