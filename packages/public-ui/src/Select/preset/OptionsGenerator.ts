// eslint-disable-next-line no-restricted-imports
import { isInsideVariable, extractVarValue } from '../VariableUtils';

import { OptionsGenerator, Option } from '~/Select';

export const generateOptions: OptionsGenerator = (
  options: Option[],
  selectedOptions: Option[],
  input: string,
  cursorPosition?: number,
  allowCustomValues?: boolean
) => {
  const variableState = isInsideVariable(input, cursorPosition || 0);
  if (variableState.insideVariable) {
    const stringToFind = extractVarValue(input, variableState).toLowerCase();

    return options.filter(
      (option) => option.value.startsWith('${') && option.value.toLowerCase().includes(stringToFind)
    );
  }

  const filteredItems = options.filter((item) => {
    return (
      (item.label?.toLowerCase().includes(input.toLowerCase()) ||
        item.value.toLowerCase().includes(input.toLowerCase())) &&
      !selectedOptions?.includes(item)
    );
  });

  if (
    input.length > 0 &&
    allowCustomValues &&
    !selectedOptions?.some((item) => {
      return item.value === input;
    })
  ) {
    filteredItems.push({
      id: input,
      value: input,
      label: input,
      isNewCustom: true,
      apply: (i, _) => i,
    });
  }
  return filteredItems;
};
