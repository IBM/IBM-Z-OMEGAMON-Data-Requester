import { Option } from '..';
import * as React from 'react';
export type FUIBadgeProps = {
    as?: React.ElementType;
    children?: React.ReactNode;
    option: Option;
    onRemove?: (option: Option) => void;
};
export declare function FUIComboboxBadge({ as: Component, ...props }: FUIBadgeProps): React.JSX.Element;
