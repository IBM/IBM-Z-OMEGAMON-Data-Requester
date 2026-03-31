import { BackendSrvRequest, DataSourceWithBackend } from '@grafana/runtime';
import {
  ApplicationMetadata,
  AffinityId,
  Originnode,
  Group,
  TableMetadata,
  Agent,
  SUPPORTED_AFFINITIES_FOR_METRICS,
  ActionDefinition,
} from 'public-domain';

import { formatEnumKeysInTableMd } from 'datasource/features/formatting/format';

interface TanStackQuery {
  queryKey: unknown[];
  queryFn: (...args: unknown[]) => unknown;
}

type FunctionReturningTanStackQuery = (...args: never[]) => TanStackQuery;

interface SingleEntityTanStackQueries {
  all?: TanStackQuery | FunctionReturningTanStackQuery;
  list?: TanStackQuery | FunctionReturningTanStackQuery;
  detail?: TanStackQuery | FunctionReturningTanStackQuery;
}

interface MultipleEntityTanStackQueries {
  [entityName: string]: SingleEntityTanStackQueries;
}

export const createMetadataTanStackQueries = (getResource: DataSourceWithBackend['getResource']) =>
  ({
    applicationMetadatas: {
      all: {
        queryKey: ['applicationMetadatas', 'all'],
        queryFn: async () => {
          const result = await getResource<{ applications: ApplicationMetadata[] }>('metadata/applications');
          const applicationsSupportedForMetrics = result.applications.filter(
            (app) => SUPPORTED_AFFINITIES_FOR_METRICS[app.affinityEntity.id]
          );
          return applicationsSupportedForMetrics;
        },
      },
    },
    agentsAndGroups: {
      list: (affinityId: AffinityId) => {
        let path = 'agents';
        if (affinityId) {
          // TO DO OMUI5-1727 Remove unnecessary escape
          // Our go backend unescapes 2 times
          // Grafana before 10.4.0 version unescapes 1 time
          // Grafana after and including 10.4.0 version does not unescape
          // Frontend sends affinityId escaped 3 times
          path = `agents/affinityId/${encodeURIComponent(encodeURIComponent(encodeURIComponent(affinityId)))}`;
        }
        return {
          queryKey: ['agentsAndGroups', 'list', { affinityId }],
          queryFn: async () => {
            const result = await getResource<{
              agents: Record<Originnode, Agent>;
              groups: Record<string, Group>;
              unsupportedAgents: Record<Originnode, Agent>;
            }>(path);
            // XEDB2: agents don't contain metrics
            const agents = Object.values(result.agents).filter(({ originnode }) => !originnode.startsWith('XEDB2:'));
            const groups = Object.values(result.groups);
            const unsupportedAgents = Object.values(result.unsupportedAgents);
            return { agents, groups, unsupportedAgents };
          },
        };
      },
    },
    actions: {
      list: (affinityId: AffinityId) => {
        let path = 'actions';
        if (affinityId) {
          // TO DO OMUI5-1727 Remove unnecessary escape
          // Our go backend unescapes 2 times
          // Grafana before 10.4.0 version unescapes 1 time
          // Grafana after and including 10.4.0 version does not unescape
          // Frontend sends affinityId escaped 3 times
          path = `actions/affinityId/${encodeURIComponent(encodeURIComponent(encodeURIComponent(affinityId)))}`;
        }
        return {
          queryKey: ['actions', 'list', { affinityId }],
          queryFn: async () => {
            const result = await getResource<{ actions: ActionDefinition[] }>(path);
            return result;
          },
        };
      },
    },
    tableMetadatas: {
      detail: (tableId: string, options?: Partial<BackendSrvRequest>) => ({
        queryKey: ['tableMetadatas', 'detail', { tableId }],
        queryFn: async () => {
          const result = await getResource<{ table: TableMetadata }>(`metadata/tables/id/${tableId}`, undefined, {
            showErrorAlert: false,
            ...options,
          });

          const tableMdWithFormattedEnumKeys = formatEnumKeysInTableMd(result.table);

          return tableMdWithFormattedEnumKeys;
        },
      }),
    },
  }) satisfies MultipleEntityTanStackQueries;
