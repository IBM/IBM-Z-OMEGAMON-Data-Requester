// eslint-disable-next-line no-restricted-imports
import { ActionDefinition, ColumnMetadataMap } from '../types';

import { createAttributeMap } from './createAttributeMap';

export function filterActions(
  actions: ActionDefinition[],
  attributeGroup: string,
  columns: ColumnMetadataMap
): ActionDefinition[] {
  return actions.filter(({ command: { variables } }) => {
    if (!variables.length) {
      return false;
    }

    const attributeToIdMap = createAttributeMap(columns);
    return variables.every((v) => {
      const splitVariable = v.split('.');

      if (splitVariable.length > 2) {
        return false;
      }

      if (splitVariable.length === 2) {
        const table = (splitVariable[0] ?? '').toUpperCase();
        const column = (splitVariable[1] ?? '').toUpperCase();

        const validAttributeGroup = table === attributeGroup.toUpperCase();
        const validAttributeName = attributeToIdMap.has(column); // example: Global_Enqueues.System_Name (when it's id is SYSNAME)
        const validId = !!columns[column]; // example: CICSplex_VSAM_Analysis.DDNAME

        return validAttributeGroup && (validAttributeName || validId);
      }

      const column = (splitVariable[0] ?? '').toUpperCase();
      if (attributeToIdMap.has(column) || !!columns[column]) {
        return true;
      }

      return false;
    });
  });
}
