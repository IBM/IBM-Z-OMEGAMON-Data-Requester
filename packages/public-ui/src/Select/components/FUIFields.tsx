import * as React from 'react';

type FUIComboboxFieldsProps<T extends React.ElementType> = {
  as?: T;
  children?: React.ReactNode;
};

export function FUIComboboxFields<T extends React.ElementType = 'div'>({ as, ...props }: FUIComboboxFieldsProps<T>) {
  const Fields = as || 'div';
  return <Fields {...props} />;
}
