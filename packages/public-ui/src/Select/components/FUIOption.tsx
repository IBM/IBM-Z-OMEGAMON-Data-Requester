import { ComboboxOption, ComboboxOptionProps } from '@headlessui/react';
import * as React from 'react';

// eslint-disable-next-line import/no-cycle
import { Option } from '~/Select';

export function FUIComboboxOption(props: ComboboxOptionProps<React.ElementType, Option>) {
  return <ComboboxOption {...props} />;
}
