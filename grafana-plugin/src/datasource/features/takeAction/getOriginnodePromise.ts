import { ScopedVars } from '@grafana/data';
import { AffinityEntity } from 'public-domain';

import { MetricsQueryParams } from 'datasource/domain';
import { MetadataLoader } from 'datasource/features/metadata';

// eslint-disable-next-line no-restricted-imports, import/no-internal-modules
import { applyVariablesInTakeActionOriginnode } from '../variables/applyVariablesInTakeActionOriginnode';

/**
 * Retrieves originnode for take action operations from original query parameters.
 *
 * This function validates that exactly one agent/group is specified and checks if it's
 * an agent (not a group) by comparing against agents and groups from the metadata loader.
 *
 * @param falconParams - Metrics query parameters containing agents/groups and affinity ID
 * @param ml - Metadata loader instance for fetching agents and groups by affinity
 * @param scopedVars - Grafana scoped variables for variable substitution
 * @returns Promise resolving to single originnode with variables applied, or null if validation fails or the entity is a group or lpar
 */
export async function getOriginnodePromise(
  falconParams: MetricsQueryParams,
  ml: MetadataLoader,
  scopedVars: ScopedVars
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
    return applyVariablesInTakeActionOriginnode(agentOrGroup.name, scopedVars);
  }
  return null;
}
