import { default as React } from 'react';
import { FUISelectProps } from './data';
import { Option } from '..';
export default function MultiSelect({ options, allowCustomValues, value, }: Omit<FUISelectProps, 'value'> & {
    value?: Option[];
}): React.JSX.Element;
