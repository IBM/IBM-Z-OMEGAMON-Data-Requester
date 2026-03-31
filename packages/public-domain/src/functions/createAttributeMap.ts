// eslint-disable-next-line no-restricted-imports
import { ColumnMetadataMap } from '../types';

export function createAttributeMap(columns: ColumnMetadataMap) {
  const attributeToIdMap = new Map<string, string>();
  for (const col of Object.values(columns)) {
    if (col.attributeName && col.id) {
      attributeToIdMap.set(col.attributeName.toUpperCase(), col.id);
    }
  }
  return attributeToIdMap;
}
