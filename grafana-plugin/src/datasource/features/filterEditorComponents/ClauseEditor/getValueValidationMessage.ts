import { ColumnMetadata } from 'public-domain';

import { validateUserDefinedValue, validateVariableInValue } from 'datasource/features/validation/validateMetricsQuery';

export function getValueValidationMessage(userDefinedValue: string, columnMetadata?: ColumnMetadata): string | null {
  if (!columnMetadata) {
    return null;
  }

  const validationMessageArray: string[] = [];

  const valueValidationMessage = validateUserDefinedValue(userDefinedValue, columnMetadata)?.message;
  const variableValidationProblem = validateVariableInValue(userDefinedValue);
  if (valueValidationMessage) {
    validationMessageArray.push(valueValidationMessage);
  }

  if (variableValidationProblem.length) {
    for (const problem of variableValidationProblem) {
      validationMessageArray.push(problem.message);
    }
  }

  return formatValidationMessage(validationMessageArray);
}

function formatValidationMessage(validationMessageArray: string[]): string | null {
  if (validationMessageArray.length > 1) {
    return validationMessageArray.join('. ') + '.';
  }

  if (validationMessageArray[0]) {
    return validationMessageArray[0];
  }

  return null;
}
