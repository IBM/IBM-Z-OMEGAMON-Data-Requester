// eslint-disable-next-line no-restricted-imports
import { isInsideVariable } from '../VariableUtils';

import { OnChangePreprocessor, Option, TextSelection } from '~/Select';

export const onChangePreprocessor: OnChangePreprocessor = (
  options: Option[],
  input: string,
  selection: TextSelection
) => {
  const newOption = [...options].pop();
  const variableState = isInsideVariable(input, selection.startIdx);

  if (variableState.insideVariable && newOption) {
    return {
      input: newOption.apply(input, { startIdx: variableState.varStart, endIdx: variableState.varEnd }),
    };
  }
  return {
    options: options,
    input: '',
  };
};
