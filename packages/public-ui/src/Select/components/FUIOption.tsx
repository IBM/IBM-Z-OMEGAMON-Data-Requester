import { ComboboxOption, ComboboxOptionProps } from '@headlessui/react';
import * as React from 'react';

import { Option } from '~/Select';

export function FUIComboboxOption(props: ComboboxOptionProps<React.ElementType, Option>) {
  return <ComboboxOption {...props} />;
}
