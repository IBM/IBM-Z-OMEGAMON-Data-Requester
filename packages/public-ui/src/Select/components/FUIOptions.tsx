import { ComboboxOptions, ComboboxOptionsProps } from '@headlessui/react';
import * as React from 'react';

import { useComboboxSize } from './useComboboxSize';

import { FUIComboboxContext, Option } from '~/Select';

type FUIComboboxOptions = Omit<ComboboxOptionsProps, 'children' | 'as'> & {
  children: (option: Option) => React.ReactNode;
  as?: React.ElementType;
};

export function FUIComboboxOptions({ children, ...props }: FUIComboboxOptions) {
  const {
    generateOptions,
    input,
    options,
    selectedOptions,
    allowCustomValues = false,
    isMulti = false,
    textSelection,
  } = React.useContext(FUIComboboxContext);

  const showOptions = generateOptions(
    options,
    isMulti ? selectedOptions : [],
    input,
    textSelection.startIdx,
    allowCustomValues
  );

  const { top, left, width } = useComboboxSize();
  return (
    <ComboboxOptions
      {...props}
      style={{
        top,
        left,
        width,
        position: 'absolute',
      }}
    >
      {showOptions.length
        ? showOptions.map((option) => {
            return children(option);
          })
        : children({
            id: -2,
            value: 'No options available',
            disabled: true,
            apply(inputText, _) {
              return inputText;
            },
          })}
    </ComboboxOptions>
  );
}
