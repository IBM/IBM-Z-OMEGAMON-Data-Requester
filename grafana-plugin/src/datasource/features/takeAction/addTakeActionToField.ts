import { Field, DataLink, DataLinkClickEvent, InterpolateFunction } from '@grafana/data';
import { TableMetadata } from 'public-domain';

import { openTakeActionPopup } from './popupManagement';

function prepareContext(framesFields: string[], replaceVariable: InterpolateFunction, tbMdId?: string) {
  const result = new Map<string, string>();
  framesFields.forEach((field) => {
    const key = tbMdId ? `${tbMdId}.${field}` : field;
    const value = replaceVariable(`\${__data.fields.${field}}`);
    if (value !== '') {
      result.set(key, value);
    }
  });
  return result;
}

const defaultInterpolateFunction = (_: string) => {
  return '';
};

export function addTakeActionToField(
  field: Field,
  framesFields: string[],
  adminPublicUrl: string,
  tbMd: TableMetadata | null,
  singleOriginnodeFromTarget: string | null
) {
  const affinityId = tbMd?.affinityEntity?.id ?? '';

  const takeActionLink: DataLink = {
    title: 'Take action...',
    url: '',
    onClick: async (event: DataLinkClickEvent) => {
      const replaceVariable = event.replaceVariables || defaultInterpolateFunction;

      let originnode = replaceVariable('${__data.fields.ORIGINNODE}');
      if (originnode === '' && singleOriginnodeFromTarget) {
        originnode = singleOriginnodeFromTarget;
      }
      const takeActionContext = prepareContext(framesFields, replaceVariable, tbMd?.id);
      openTakeActionPopup(adminPublicUrl, originnode, takeActionContext, affinityId);

      event.e.preventDefault();
    },
  };

  field.config.links = [...(field.config.links ?? []), takeActionLink];
  return field;
}
