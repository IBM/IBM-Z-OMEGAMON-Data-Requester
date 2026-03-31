import { ComboboxOptionsProps } from '@headlessui/react';
import { Option } from '..';
import * as React from 'react';
type FUIComboboxOptions = Omit<ComboboxOptionsProps, 'children' | 'as'> & {
    children: (option: Option) => React.ReactNode;
    as?: React.ElementType;
};
export declare function FUIComboboxOptions({ children, ...props }: FUIComboboxOptions): React.JSX.Element;
export {};
