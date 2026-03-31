export function updateTo_V1(current: unknown): CalculateCounterRateTransformerOptions_V1 {
  const currentAsObject = typeof current === 'object' ? current : {};
  return { ...currentAsObject, falconVersion: 1 };
}

export interface CalculateCounterRateTransformerOptions_V1 {
  sourceColumn?: string;
  counterRateColumnName?: string;
  timeColumn?: string;
  falconVersion: 1;
}
