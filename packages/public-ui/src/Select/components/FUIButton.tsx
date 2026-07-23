// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

import { ComboboxButton, ComboboxButtonProps } from '@headlessui/react';
import * as React from 'react';

export function FUIComboboxButton(props: ComboboxButtonProps<React.ElementType>) {
  return <ComboboxButton {...props} />;
}
