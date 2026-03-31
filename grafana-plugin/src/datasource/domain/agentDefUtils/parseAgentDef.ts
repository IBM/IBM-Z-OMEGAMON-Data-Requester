import type { SourceDef, AtLparDef } from 'datasource/domain';

const atLparRegexpr = /^@Lpar\((.*)\)$/i;

/** Produces AgentDef object based on human-readable string
 *
 * throws if input is known to be incorrect
 */
export function parseAgentDef(value: string): SourceDef {
  const trimmed = value.trim();
  const match = trimmed.match(atLparRegexpr);
  if (typeof match?.[1] === 'string') {
    return buildAtLparDef(match[1]);
  }

  return {
    id: 'agentOrGroupName',
    name: trimmed,
  };
}

function buildAtLparDef(lparList: string): AtLparDef {
  const lpars = lparList
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    id: 'atLpar',
    lpars,
  };
}
