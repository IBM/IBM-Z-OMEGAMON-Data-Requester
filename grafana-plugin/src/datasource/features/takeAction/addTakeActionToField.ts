import { Field, DataLink, DataLinkClickEvent, DataFrame, ScopedVars } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import { ActionDefinition, createAttributeMap, TableMetadata } from 'public-domain';

function extractAttribute(variable: string, tableName: string): string | undefined {
  const parts = variable.split('.');
  if (parts.length === 2 && parts[0] === tableName) {
    return parts[1];
  }
  return parts.length === 1 ? parts[0] : undefined;
}

function prepareContext(actions: ActionDefinition[], frame: DataFrame, tbMd: TableMetadata, idx?: number) {
  const attributeToIdMap = createAttributeMap(tbMd.columns);

  const result = new Map<string, string>();
  actions.forEach(({ command: { variables } }) => {
    variables.forEach((v) => {
      if (!result.has(v)) {
        const attributeOrId = extractAttribute(v, tbMd.name);

        if (attributeOrId) {
          const possibleFieldId = attributeToIdMap.get(attributeOrId.toUpperCase()) || attributeOrId;
          const field = frame.fields.find((field) => field.name.toUpperCase() === possibleFieldId.toUpperCase());
          if (field && idx !== undefined) {
            result.set(v, field.values[idx]);
          }
        }
      }
    });
  });
  return result;
}

export function addTakeActionToField(
  field: Field,
  actions: ActionDefinition[],
  frame: DataFrame,
  adminPublicUrl: string,
  tbMd: TableMetadata,
  singleOriginNodeFromTarget: string | null,
  scopedVars: ScopedVars
) {
  const affinityId = tbMd?.affinityEntity?.id ?? '';

  const takeActionLink: DataLink = {
    title: 'Take action...',
    url: '',
    onClick: async (event: DataLinkClickEvent) => {
      // rowIndex could be undefined if click happens on bar, pie or any other type of chart that
      // transforms data to be series
      const rowIndex = event.origin?.rowIndex as number | undefined;
      const field = frame.fields.find((field) => {
        return field.name === 'ORIGINNODE';
      });
      let originnode = (field && rowIndex !== undefined ? field.values[rowIndex] : singleOriginNodeFromTarget) || '';

      const templateSrv = getTemplateSrv();
      originnode = templateSrv.replace(originnode, scopedVars, 'text');
      const takeActionContext = tbMd && prepareContext(actions, frame, tbMd, rowIndex);
      const params = new URLSearchParams({
        // This is needed in order to make "cancel"/"done" buttons
        // to close popup window instead of causing navigation in it
        mode: 'integrated',
      });
      affinityId && params.append('affinityId', affinityId);
      tbMd && params.append('tableId', tbMd.id);
      takeActionContext?.forEach((value, key) => {
        params.append(`context.${key}`, value);
      });
      params.append('agentId', originnode);

      const takeActionUrl = `${adminPublicUrl}/en/take-action/?${params.toString()}`;

      const parentLeft = window.screenX ?? window.screenLeft;
      const parentTop = window.screenY ?? window.screenTop;
      const parentWidth = window.outerWidth;
      const parentHeight = window.outerHeight;

      const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const clamp = (n: number, min: number, max: number): number => Math.max(Math.min(n, max), min);
      // See TakeActionModal.tsx for those fancy numbers
      const width = clamp(parentWidth * 0.4, 36.875 * remSize, 58 * remSize);
      const height = clamp(parentHeight * 0.72, 10 * remSize, 45 * remSize);

      const maxLeft = window.screen.width - width;
      const maxTop = window.screen.height - height;

      const left = clamp(parentLeft + (parentWidth - width) / 2, 0, maxLeft);
      const top = clamp(parentTop + (parentHeight - height) / 2, 0, maxTop);

      window.open(
        takeActionUrl,
        '_blank',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );

      event.e.preventDefault();
    },
  };

  field.config.links = [...(field.config.links ?? []), takeActionLink];
  return field;
}
