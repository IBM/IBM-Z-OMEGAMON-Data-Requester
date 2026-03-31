import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ApplicationMetadata, AffinityId, ManagedSystems, TableMetadata } from 'public-domain';

import { useMetadataTanStackQueries } from './MetadataLoaderProvider';

export function useApplicationMetadatas(): UseQueryResult<ApplicationMetadata[]> {
  const metadataTanStackQueries = useMetadataTanStackQueries();
  const queryResult = useQuery({
    ...metadataTanStackQueries.applicationMetadatas.all,
  });
  return queryResult;
}

function useAgentsAndGroupsByAffinityId(affinityId: AffinityId | undefined): UseQueryResult<ManagedSystems> {
  const metadataTanStackQueries = useMetadataTanStackQueries();
  const queryResult = useQuery({
    enabled: !!affinityId,
    ...(affinityId ? metadataTanStackQueries.agentsAndGroups.list(affinityId) : null),
  });
  return queryResult;
}

export function useAgentsAndGroups(affinityId: AffinityId): UseQueryResult<ManagedSystems> {
  const queryResult = useAgentsAndGroupsByAffinityId(affinityId);
  return queryResult;
}

export function useTableMetadata(tableId: string): UseQueryResult<TableMetadata> {
  const metadataTanStackQueries = useMetadataTanStackQueries();
  const queryResult = useQuery({
    enabled: !!tableId,
    ...metadataTanStackQueries.tableMetadatas.detail(tableId),
  });
  return queryResult;
}
