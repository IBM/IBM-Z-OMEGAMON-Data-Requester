import React from 'react';

import { AsBadge, AsButton, AsCombobox, AsFields, AsInput, AsOption, AsOptions, FUISelectProps } from './data';

import {
  FUIMultipleCombobox,
  FUIComboboxFields,
  FUIComboboxBadges,
  FUIComboboxBadge,
  FUIComboboxInput,
  FUIComboboxOptions,
  FUIComboboxOption,
  FUIComboboxButton,
  Option,
  onChangePreprocessor,
  generateOptions,
} from '~/Select';

export default function MultiSelect({
  options,
  allowCustomValues,
  value,
}: Omit<FUISelectProps, 'value'> & { value?: Option[] }) {
  return (
    <FUIMultipleCombobox
      value={value}
      generateOptions={generateOptions}
      preprocessOnChangeValues={onChangePreprocessor}
      options={options}
      allowCustomValues={allowCustomValues}
      as={AsCombobox}
    >
      <FUIComboboxFields as={AsFields}>
        <FUIComboboxBadges>
          {(option, onRemove) => <FUIComboboxBadge key={option.id} option={option} onRemove={onRemove} as={AsBadge} />}
        </FUIComboboxBadges>
        <FUIComboboxInput as={AsInput} />
      </FUIComboboxFields>
      <FUIComboboxButton as={AsButton} />
      <FUIComboboxOptions as={AsOptions}>
        {(option) => (
          <FUIComboboxOption key={option.id} value={option} disabled={option.disabled} as={AsOption}>
            {option.isNewCustom ? `Create "${option.label || option.value}"` : option.label || option.value}
          </FUIComboboxOption>
        )}
      </FUIComboboxOptions>
    </FUIMultipleCombobox>
  );
}
