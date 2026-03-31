import type { SourceDef } from 'datasource/domain';

/** Converts AgentDef into a human-readable string */
export function stringifyAgentDef(def: SourceDef): string {
  switch (def.id) {
    case 'agentOrGroupName': {
      return def.name;
    }
    case 'atLpar': {
      return `@Lpar(${def.lpars.join(', ')})`;
    }
  }
}
