import { ScopedVars } from '@grafana/data';

import { TemplateVariablesDetails } from './TemplateVariablesDetails';

/**
 * Applies template variable substitution for take action originnode.
 *
 * If the input contains no variables, it returns the original string unchanged.
 * If the input is a single variable expression with exactly one value, it returns that value.
 * Otherwise (multiple values, no values, or complex expressions), it returns an empty string.
 *
 * @param possibleVariable - String that may contain Grafana template variables
 * @param scopedVars - Grafana scoped variables for variable substitution
 * @returns Resolved variable value, original string if no variables, or empty string if ambiguous
 */
export const applyVariablesInTakeActionOriginnode = (possibleVariable: string, scopedVars: ScopedVars) => {
  const templateVariablesDetails = new TemplateVariablesDetails(possibleVariable, scopedVars);

  if (!templateVariablesDetails.containsVariables()) {
    return possibleVariable;
  }
  if (!templateVariablesDetails.isSingleVariableExpression()) {
    return '';
  }

  const variations = templateVariablesDetails.getVariations();
  return variations.length > 1 || variations.length === 0 ? '' : variations[0];
};
