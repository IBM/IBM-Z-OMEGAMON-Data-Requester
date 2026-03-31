import { AffinityEntity } from 'public-domain';

import { MetricsQueryParams } from 'datasource/domain';
import { MetadataLoader } from 'datasource/features/metadata';

export async function getOriginnodePromise(
  falconParams: MetricsQueryParams,
  ml: MetadataLoader
): Promise<string | null> {
  const { agentsAndGroups, affinityId } = falconParams;

  if (agentsAndGroups.length !== 1) {
    return null;
  }
  const agentOrGroup = agentsAndGroups[0];
  if (!agentOrGroup || agentOrGroup.id !== 'agentOrGroupName') {
    return null;
  }

  const originnodesAndGroups = await ml.getAgentsAndGroupsByAffinity({
    id: affinityId,
  } as AffinityEntity);

  const isNotGroup = originnodesAndGroups.groups.every((group) => group.name !== agentOrGroup.name);
  if (isNotGroup) {
    return agentOrGroup.name;
  }
  return null;
}
