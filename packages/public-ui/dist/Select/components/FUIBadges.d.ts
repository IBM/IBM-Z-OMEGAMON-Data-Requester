import { Option } from '..';
import * as React from 'react';
type FUIComboboxBadges = {
    children: (option: Option, onRemove: (option: Option) => void) => React.ReactNode;
};
export declare function FUIComboboxBadges({ children }: FUIComboboxBadges): React.ReactNode[];
export {};
