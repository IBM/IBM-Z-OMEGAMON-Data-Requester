export function updateTo_V1(current: unknown): ZOsOriginnodeTransformerOptions_V1 {
  const currentAsObject = typeof current === 'object' ? current : {};
  return { ...currentAsObject, falconVersion: 1 };
}

export interface ZOsOriginnodeTransformerOptions_V1 {
  datasourceUid?: string;
  lparColumn?: string;
  falconVersion: 1;
}
