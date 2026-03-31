import { ComboboxProps } from '@headlessui/react';
import { default as React } from 'react';
import { OnChangePreprocessor, Option, OptionsGenerator } from '..';
/**
 * FUIMultiCombobox and FUISingleCombobox extend common combobox behavior.
 * Instead of just onChange function, they require preprocessOnChangeValues & externalOnChange functions.
 *
 * preprocessOnChangeValues allows you prepare options and/or input rather then just set them to state.
 * For example your current input is "test_of_${|" where | symbol is your caret position right now, and
 * you hit an enter button on option that should be variable - "${db2_variable}".
 * In common combobox case you will just select that variable and your input is gone.
 * In case of this function you could write it so that when you hit enter option is not selected, but its
 * values is injected into input so you get "test_of_${db2_variable}" and now you have value that
 * you would like to make a selected option.
 *
 * externalOnChange allows you to synchronize state of combobox and contexts where it is used
 * once inner onChange happens.
 */
type FUIMultiComboboxProps = Omit<ComboboxProps<Option[], true>, 'as' | 'multiple' | 'immediate' | 'onChange'> & {
    options: Option[];
    generateOptions: OptionsGenerator;
    preprocessOnChangeValues: OnChangePreprocessor;
    allowCustomValues?: boolean;
    as?: React.ElementType;
    externalOnChange?: (value: Option[]) => void;
};
type FUISingleComboboxProps = Omit<ComboboxProps<Option, false>, 'as' | 'immediate' | 'onChange'> & {
    options: Option[];
    generateOptions: OptionsGenerator;
    preprocessOnChangeValues: OnChangePreprocessor;
    allowCustomValues?: boolean;
    as?: React.ElementType;
    externalOnChange?: (value: Option | null) => void;
};
export declare function FUIMultipleCombobox({ options, generateOptions, preprocessOnChangeValues, allowCustomValues, externalOnChange, ...props }: FUIMultiComboboxProps): React.JSX.Element;
export declare function FUISingleCombobox({ options, generateOptions, preprocessOnChangeValues, allowCustomValues, externalOnChange, ...props }: FUISingleComboboxProps): React.JSX.Element;
export {};
