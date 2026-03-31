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
