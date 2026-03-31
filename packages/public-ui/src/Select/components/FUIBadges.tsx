import * as React from 'react';

import { FUIComboboxContext, Option } from '~/Select';

type FUIComboboxBadges = {
  children: (option: Option, onRemove: (option: Option) => void) => React.ReactNode;
};

export function FUIComboboxBadges({ children }: FUIComboboxBadges) {
  const {
    selectedOptions,
    handleOnRemove = (_: Option) => {
      console.log('FUI, WARNING! No remove option function is provided');
      return;
    },
  } = React.useContext(FUIComboboxContext);

  return selectedOptions.map((option) => {
    return children(option, handleOnRemove);
  });
}
