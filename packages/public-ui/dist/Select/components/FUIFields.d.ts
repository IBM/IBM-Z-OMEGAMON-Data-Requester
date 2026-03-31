import * as React from 'react';
type FUIComboboxFieldsProps<T extends React.ElementType> = {
    as?: T;
    children?: React.ReactNode;
};
export declare function FUIComboboxFields<T extends React.ElementType = 'div'>({ as, ...props }: FUIComboboxFieldsProps<T>): React.JSX.Element;
export {};
