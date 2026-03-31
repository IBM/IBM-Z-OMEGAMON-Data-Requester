import { default as React } from 'react';
import { Option, FUIBadgeProps } from '..';
export type FUISelectProps = {
    options: Option[];
    allowCustomValues?: boolean;
    value?: Option;
    placeHolder?: string;
};
export declare const options: Option[];
export declare const variables: Option[];
export declare const AsCombobox: React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement>>;
export declare const AsButton: React.ForwardRefExoticComponent<React.RefAttributes<HTMLButtonElement>>;
export declare const AsInput: React.ForwardRefExoticComponent<React.RefAttributes<HTMLInputElement>>;
export declare const AsOptions: React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement>>;
export declare const AsOption: React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement>>;
export declare const AsFields: React.ForwardRefExoticComponent<React.RefAttributes<HTMLDivElement>>;
export declare const AsBadge: React.ForwardRefExoticComponent<FUIBadgeProps & React.RefAttributes<HTMLDivElement>>;
