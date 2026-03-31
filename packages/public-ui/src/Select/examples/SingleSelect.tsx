import React from 'react';

import { AsButton, AsCombobox, AsInput, AsOption, AsOptions, FUISelectProps } from './data';

import {
  FUIComboboxInput,
  FUIComboboxOptions,
  FUIComboboxOption,
  generateOptions,
  FUISingleCombobox,
  FUIComboboxButton,
  onChangePreprocessor,
} from '~/Select';

export default function SingleSelect({ options, allowCustomValues, value }: FUISelectProps) {
  return (
    <FUISingleCombobox
      generateOptions={generateOptions}
      preprocessOnChangeValues={onChangePreprocessor}
      options={options}
      value={value}
      allowCustomValues={allowCustomValues}
      as={AsCombobox}
    >
      <FUIComboboxInput as={AsInput} />
      <FUIComboboxButton as={AsButton} />
      <FUIComboboxOptions as={AsOptions}>
        {(option) => (
          <FUIComboboxOption key={option.id} value={option} disabled={option.disabled} as={AsOption}>
            {option.isNewCustom ? `Create "${option.label || option.value}"` : option.label || option.value}
          </FUIComboboxOption>
        )}
      </FUIComboboxOptions>
    </FUISingleCombobox>
  );
}
