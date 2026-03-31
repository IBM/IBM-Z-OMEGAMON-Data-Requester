import { DataSourceInstanceSettings } from '@grafana/data';
import { BackendSrvRequest, DataSourceWithBackend, isFetchError } from '@grafana/runtime';
import { QueryClient as TanStackQueryClient } from '@tanstack/react-query';
import {
  TableMetadata,
  ApplicationMetadata,
  AffinityEntity,
  ManagedSystems,
  ColumnMetadataMap,
  ActionDefinition,
  AffinityId,
} from 'public-domain';

import { FalconDatasourceJsonData } from 'datasource/domain';

import { createMetadataTanStackQueries } from './createMetadataTanStackQueries';
import { ResourceFetchError } from './ResourceFetchError';

interface ResourceLoader {
  getResource: DataSourceWithBackend['getResource'];
  instanceSettings: DataSourceInstanceSettings<FalconDatasourceJsonData>;
  // May be used later
  // postResource<T>(path: string, params: unknown): Promise<T>;
}

export class MetadataLoader {
  private static getResourceFetchError(rawError: unknown): Error {
    if (rawError instanceof Error) {
      return rawError;
    }

    if (typeof rawError === 'string') {
      return new Error(`An error occurred while loading resource: ${rawError}`);
    }

    if (isFetchError(rawError)) {
      return new ResourceFetchError(rawError);
    }

    return new Error('An unknown error occurred while loading resource');
  }

  readonly metadataTanStackQueryClient = new TanStackQueryClient();
  readonly metadataTanStackQueries = createMetadataTanStackQueries(
    (path: string, params?: BackendSrvRequest['params'], options?: Partial<BackendSrvRequest>) =>
      this.getResource(path, params, options)
  );

  constructor(private resourceLoader: ResourceLoader) {
    this.metadataTanStackQueryClient.setDefaultOptions({
      queries: { staleTime: resourceLoader.instanceSettings.jsonData.metadataCacheTimeInSec * 1000 },
    });
    this.metadataTanStackQueryClient.prefetchQuery({
      ...this.metadataTanStackQueries.applicationMetadatas.all,
    });
  }

  async getResource<T>(
    path: string,
    params?: BackendSrvRequest['params'],
    options?: Partial<BackendSrvRequest>
  ): Promise<T> {
    try {
      const result = await this.resourceLoader.getResource<T | null | undefined>(path, params, options);
      if (!result) {
        throw new Error('Fetching resource: got undefined "result"');
      }
      return result;
    } catch (error) {
      throw MetadataLoader.getResourceFetchError(error);
    }
  }

  // TODO: return Promise<TableMetadata | null>
  async getTableMetadata(tableId: string, options?: Partial<BackendSrvRequest>): Promise<TableMetadata> {
    const tableMetadata = await this.metadataTanStackQueryClient.fetchQuery({
      ...this.metadataTanStackQueries.tableMetadatas.detail(tableId, options),
    });
    return tableMetadata;
  }

  async getTableMetadatas(tableIds: string[]): Promise<TableMetadata[]> {
    const tableMdPromises = tableIds.map(async (tableId) => this.getTableMetadata(tableId));
    const tableMds = await Promise.all(tableMdPromises);
    return tableMds;
  }

  async getApplicationMetadatas(): Promise<ApplicationMetadata[]> {
    const applicationMetadatas = await this.metadataTanStackQueryClient.fetchQuery({
      ...this.metadataTanStackQueries.applicationMetadatas.all,
    });
    return applicationMetadatas;
  }

  /**
   * Gets unique column names from multiple tables excluding ORIGINNODE
   * @param tableIds tables to get column names from
   * @returns unique column names from tables
   */
  async getColumnNamesFromTableIds(tableIds: string[]): Promise<string[]> {
    const tableMetadatas = (
      await Promise.allSettled(tableIds.map((tableId) => this.getTableMetadata(tableId, { showErrorAlert: true })))
    ).reduce((acc, result) => {
      if (result.status === 'fulfilled') {
        acc.push(result.value);
      }
      return acc;
    }, [] as TableMetadata[]);

    const columnNamesSet = tableMetadatas.reduce((acc, { columns }) => {
      Object.values(columns).forEach(({ id, name }) => {
        if (id !== 'ORIGINNODE') {
          acc.add(name);
        }
      });
      return acc;
    }, new Set<string>());

    return [...columnNamesSet];
  }

  async getAgentsAndGroupsByAffinity(affinity: AffinityEntity): Promise<ManagedSystems> {
    const agentsAndGroups = await this.metadataTanStackQueryClient.fetchQuery({
      ...this.metadataTanStackQueries.agentsAndGroups.list(affinity.id),
    });
    return agentsAndGroups;
  }

  async getColumnMetadataForAdHocFilters(tableIds: string[]): Promise<ColumnMetadataMap> {
    const promises = tableIds.map(async (tableId) => {
      const table = await this.getTableMetadata(tableId, { showErrorAlert: true });
      return table.columns;
    });

    const results = await Promise.allSettled<ColumnMetadataMap>(promises);

    return results.reduce((acc: ColumnMetadataMap, result) => {
      if (result.status === 'fulfilled') {
        return { ...acc, ...result.value };
      } else {
        const reason: Error = result.reason;
        console.log(`An error occurred while getting column metadata for AdHoc filters: ${reason.message}`);
        return acc;
      }
    }, {});
  }
  async getAction(affinity: string): Promise<ActionDefinition[]> {
    const { actions } = await this.metadataTanStackQueryClient.fetchQuery({
      ...this.metadataTanStackQueries.actions.list(affinity as AffinityId),
    });
    return actions;
  }
}
