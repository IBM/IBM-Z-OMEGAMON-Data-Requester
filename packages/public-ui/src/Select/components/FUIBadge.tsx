import * as React from 'react';

import { Option } from '~/Select';

export type FUIBadgeProps = {
  as?: React.ElementType;
  children?: React.ReactNode;
  option: Option;
  onRemove?: (option: Option) => void;
};

export function FUIComboboxBadge({ as: Component = 'div', ...props }: FUIBadgeProps) {
  return <Component {...props} />;
}
