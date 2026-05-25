import { type Branded } from 'public-common';

import { type AffinityEntity } from './AffinityEntity';
import { type TableMetadata } from './TableMetadata';

export const HUB_GROUP_NAME = '*HUB';

export type Originnode = Branded<string, 'Originnode'>;

/**
 * Why not `AgentMetadata`? Because `originnode` values are not predefined.
 */
export type Agent = {
  originnode: Originnode;
  versionString: string;
  version: number;
  isOnline: boolean;
  managingTems: Originnode;
  affinityEntity: AffinityEntity;
} & Pick<TableMetadata, 'productCode'>;

export type Group = {
  name: string;
  affinityEntity: AffinityEntity;
  agents: Originnode[];
};

export interface AgentsAndGroups {
  agents: AgentIndex;
  unsupportedAgents: AgentIndex;
  groups: GroupIndex;
}

export type AgentIndex = Record<string, Agent>;
export type GroupIndex = Record<string, Group>;

/**
 * Returns agents and groups where all members meet version criteria.
 */
function filterAgentsAndGroupsByVersion(
  { agents, groups, unsupportedAgents }: AgentsAndGroups,
  minVersion: number,
  comparison: '>=' | '<'
): AgentsAndGroups {
  const satisfies = (version: number): boolean => (comparison === '>=' ? version >= minVersion : version < minVersion);

  const filteredAgents: AgentIndex = Object.fromEntries(
    Object.entries(agents).filter(([, agent]) => satisfies(agent.version))
  );

  const filteredGroups: GroupIndex = Object.fromEntries(
    Object.entries(groups).filter(([, group]) =>
      group.agents.every((originnode) => {
        const agent = agents[originnode];
        return agent !== undefined && satisfies(agent.version);
      })
    )
  );

  return { agents: filteredAgents, groups: filteredGroups, unsupportedAgents };
}

/**
 * Returns agents and groups where all members have sufficient version (>= minVersion).
 */
export function getSufficientVersionAgentsAndGroups(
  agentsAndGroups: AgentsAndGroups,
  minVersion: number
): AgentsAndGroups {
  return filterAgentsAndGroupsByVersion(agentsAndGroups, minVersion, '>=');
}

/**
 * Returns agents and groups where all members have insufficient version (< minVersion).
 */
export function getInsufficientVersionAgentsAndGroups(
  agentsAndGroups: AgentsAndGroups,
  minVersion: number
): AgentsAndGroups {
  return filterAgentsAndGroupsByVersion(agentsAndGroups, minVersion, '<');
}

/**
 * Returns array of agent origin nodes and group names.
 * When `includeNonRocketAgents` is true, non-Rocket agent origin nodes are included as well.
 */
export function getAgentsAndGroupsNames(
  { agents, groups, unsupportedAgents }: AgentsAndGroups,
  { includeNonRocketAgents = false } = {}
): string[] {
  const names = [...Object.keys(agents), ...Object.keys(groups)];
  if (includeNonRocketAgents) {
    names.push(...Object.keys(unsupportedAgents));
  }
  return names;
}

/**
 * Filters agents and groups by a list of affinity IDs.
 */
export function filterAgentsAndGroupsByAffinityId(
  { agents, groups, unsupportedAgents }: AgentsAndGroups,
  affinityId: string
): AgentsAndGroups {
  const filteredAgents: AgentIndex = Object.fromEntries(
    Object.entries(agents).filter(([, agent]) => agent.affinityEntity.id === affinityId)
  );

  const filteredGroups: GroupIndex = Object.fromEntries(
    Object.entries(groups).filter(([, group]) => group.affinityEntity.id === affinityId)
  );

  return { agents: filteredAgents, groups: filteredGroups, unsupportedAgents };
}

/**
 * Returns true if the originnode belongs to an agent that has no metrics (e.g. XEDB2: agents).
 */
export function isNoMetricsAgentOriginnode(originnode: string): boolean {
  return originnode.startsWith('XEDB2:');
}
