import { ScopedVars } from '@grafana/data';
import { getTemplateSrv, VariableInterpolation } from '@grafana/runtime';

import { MetricsQueryParma } from 'datasource/domain';

import { TemplateVariablesDetails } from './TemplateVariablesDetails';

export function applyVariablesInParmas(parmas: MetricsQueryParma[], scopedVars: ScopedVars): MetricsQueryParma[] {
  return parmas.map((parma) => {
    if (!parma.value) {
      return parma;
    }

    const interpolations: VariableInterpolation[] = [];
    getTemplateSrv().replace(parma.value, scopedVars, '', interpolations);
    if (
      interpolations.length === 1 &&
      interpolations[0] &&
      ['__from', '__to'].includes(interpolations[0].variableName)
    ) {
      return { ...parma, value: getTemplateSrv().replace(parma.value, scopedVars, '') };
    }

    const templateVariablesDetails = new TemplateVariablesDetails(parma.value, scopedVars);
    return { ...parma, value: templateVariablesDetails.getVariations().join(',') };
  });
}
