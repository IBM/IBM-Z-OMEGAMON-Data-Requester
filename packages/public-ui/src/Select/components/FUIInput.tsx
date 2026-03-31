import { ComboboxInput, ComboboxInputProps } from '@headlessui/react';
import React, { useContext } from 'react';

import { FUIComboboxContext, Option } from '~/Select';

export function FUIComboboxInput<T>({ ...props }: ComboboxInputProps<React.ElementType, T>) {
  const { handleSetInput, inputRef, input, isMulti, handleCaretChange } = useContext(FUIComboboxContext);
  const displayValueProps = !isMulti
    ? {
        displayValue: (item: T) => {
          if (!item) {
            return input || '';
          }
          const option = item as unknown as Option;
          if (option.id === -1) {
            return input;
          }
          return option.label || option.value;
        },
      }
    : {};
  return (
    <ComboboxInput
      {...props}
      {...displayValueProps}
      ref={inputRef}
      onSelect={handleCaretChange}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetInput(e.target.value)}
      style={{
        outline: 'none',
        boxShadow: 'none',
        border: 'none',
      }}
    />
  );
}
