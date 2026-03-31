import { ScopedVars } from '@grafana/data';
import { uniq } from 'lodash';
import { AffinityId, MVS_CICS_AFFINITY_ID } from 'public-domain';

import { SourceDef, AgentOrGroupName, AtLparDef } from 'datasource/domain';

import { TemplateVariablesDetails } from './TemplateVariablesDetails';

export function applyVariablesInAgentsAndGroups(
  agentsAndGroups: SourceDef[],
  scopedVars: ScopedVars,
  affinityId: AffinityId
): SourceDef[] {
  return agentsAndGroups.flatMap((agentDef): SourceDef | SourceDef[] => {
    switch (agentDef.id) {
      case 'agentOrGroupName': {
        let originnode = applyVariablesInOriginnode(agentDef, scopedVars);
        if (affinityId === MVS_CICS_AFFINITY_ID) {
          originnode = formatOriginnodeForOMCICS(originnode);
        }
        return originnode;
      }
      case 'atLpar': {
        let sourceDef = applyVariablesInAtLparFunc(agentDef, scopedVars);
        if (affinityId === MVS_CICS_AFFINITY_ID) {
          sourceDef = formatSourceDefForOMCICS(sourceDef);
        }
        return sourceDef;
      }
    }
  });
}

function formatOriginnodeForOMCICS(originnode: AgentOrGroupName[]): AgentOrGroupName[] {
  return originnode.map((node) => {
    const splitNode = node.name.split('.');
    if (splitNode[0]) {
      splitNode[0] = padLpar(splitNode[0]);
    }
    node.name = splitNode.join('.');
    return node;
  });
}

function formatSourceDefForOMCICS(sourceDef: SourceDef) {
  if (sourceDef.id === 'atLpar') {
    sourceDef.lpars = sourceDef.lpars.map((lpar) => padLpar(lpar));
  }
  return sourceDef;
}

function padLpar(lpar: string): string {
  return lpar.padEnd(4, '_');
}

function applyVariablesInOriginnode(agentDef: AgentOrGroupName, scopedVars: ScopedVars): AgentOrGroupName[] {
  const templateVariablesDetails = new TemplateVariablesDetails(agentDef.name, scopedVars);
  return templateVariablesDetails.getVariations().map((name) => ({ id: 'agentOrGroupName', name }));
}

function applyVariablesInAtLparFunc(agentDef: AtLparDef, scopedVars: ScopedVars): SourceDef {
  const variableDetails = agentDef.lpars.map((lpar) => new TemplateVariablesDetails(lpar, scopedVars));
  const resolvedLpars = variableDetails.flatMap((varDetail) => varDetail.getVariations());

  return {
    id: 'atLpar',
    lpars: uniq(resolvedLpars),
  };
}
