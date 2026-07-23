// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

import { type Group, type Agent } from './AgentsAndGroups';

/**
 * @deprecated use AgentsAndGroups
 */
export type ManagedSystems = {
  agents: Agent[];
  groups: Group[];
  unsupportedAgents: Agent[];
};
