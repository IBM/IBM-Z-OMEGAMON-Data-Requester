import { Field, FieldType, SelectableValue, getFieldDisplayName } from '@grafana/data';

export function getMinTimeStep(timeField: Field): number {
  let previousTime: number | undefined;
  let minTimeStep = Number.MAX_VALUE;

  for (const time of timeField.values) {
    const currentTime = time;
    if (previousTime !== undefined) {
      const currentTimeStep = currentTime - previousTime;

      if (currentTimeStep < minTimeStep) {
        minTimeStep = currentTimeStep;
      }
    }
    previousTime = currentTime;
  }
  return minTimeStep;
}

export function validateTimeStep(field: Field): boolean {
  if (field.type !== FieldType.time) {
    return false;
  }
  const timeStep = getMinTimeStep(field);
  if (timeStep <= 0 || timeStep === Number.MAX_VALUE) {
    return false;
  }
  return true;
}

export function getFieldBaseDisplayName(field: Field): string {
  return getFieldDisplayName({
    ...field,
    labels: undefined,
    config: {
      // Grafana uses displayName in this function.
      displayName: field.config.displayNameFromDS,
      ...field.config,
    },
  });
}

export function fieldToSelectableValue(field: Field): SelectableValue<string> {
  return {
    value: field.name,
    label: getFieldBaseDisplayName(field),
  };
}
