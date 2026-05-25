import { default as React } from 'react';
import { Option } from '..';
import { FUISelectProps } from './data';
export default function MultiSelect({ options, allowCustomValues, value, }: Omit<FUISelectProps, 'value'> & {
    value?: Option[];
}): React.JSX.Element;
