export function updateTo_V1(current: unknown): CalculateDeltaTransformerOptions_V1 {
  const currentAsObject = typeof current === 'object' ? current : {};
  return { ...currentAsObject, falconVersion: 1 };
}

export interface CalculateDeltaTransformerOptions_V1 {
  sourceColumn?: string;
  deltaColumnName?: string;
  falconVersion: 1;
}
