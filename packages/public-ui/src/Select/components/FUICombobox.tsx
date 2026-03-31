import { Combobox, ComboboxProps } from '@headlessui/react';
import { isEqual } from 'lodash';
import React, { useRef, useState } from 'react';

import { FUIComboboxContext, OnChangePreprocessor, Option, OptionsGenerator, TextSelection } from '~/Select';

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

export function FUIMultipleCombobox({
  options,
  generateOptions,
  preprocessOnChangeValues,
  allowCustomValues,
  externalOnChange,
  ...props
}: FUIMultiComboboxProps) {
  const comboboxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [textSelection, setTextSelection] = useState<TextSelection>({
    startIdx: 0,
    endIdx: 0,
  });

  const [input, setInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(props.value || []);

  const handleCaretChange = () =>
    setTextSelection({
      startIdx: inputRef.current?.selectionStart || 0,
      endIdx: inputRef.current?.selectionEnd || 0,
    });

  const onChange = (options: Option[]) => {
    const result = preprocessOnChangeValues(options, input, {
      startIdx: inputRef.current?.selectionStart || 0,
      endIdx: inputRef.current?.selectionEnd || 0,
    });
    if (result.options) {
      setSelectedOptions(result.options);
      setInput('');
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      if (externalOnChange) {
        externalOnChange(result.options);
      }
    }
    if (result.input && inputRef.current) {
      inputRef.current.value = result.input;
      setInput(result.input);
    }
  };

  const handleOnRemove = (option: Option) => {
    const newSelectedOptions = selectedOptions.filter((selectedOption) => !isEqual(option, selectedOption));
    onChange(newSelectedOptions);
  };

  return (
    <FUIComboboxContext.Provider
      value={{
        options,
        selectedOptions,
        generateOptions,
        comboboxRef,
        input,
        textSelection,
        handleCaretChange,
        handleSetInput: setInput,
        inputRef,
        handleOnRemove,
        allowCustomValues,
        isMulti: true,
      }}
    >
      <Combobox
        {...props}
        multiple
        immediate
        value={selectedOptions}
        onChange={onChange}
        ref={comboboxRef}
        as={props.as || 'div'}
      />
    </FUIComboboxContext.Provider>
  );
}

const emptyOption: Option = {
  id: -1,
  value: '',
  apply(_inputText, _selection) {
    return '';
  },
};

export function FUISingleCombobox({
  options,
  generateOptions,
  preprocessOnChangeValues,
  allowCustomValues,
  externalOnChange,
  ...props
}: FUISingleComboboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState('');
  const [textSelection, setTextSelection] = useState<TextSelection>({
    startIdx: 0,
    endIdx: 0,
  });
  const [selectedOption, setSelectedOption] = useState(props.value || emptyOption);

  const handleCaretChange = () =>
    setTextSelection({
      startIdx: inputRef.current?.selectionStart || 0,
      endIdx: inputRef.current?.selectionEnd || 0,
    });

  const onChange = (option: Option | null) => {
    if (!option) {
      setInput('');
      setSelectedOption(emptyOption);
      if (externalOnChange) {
        externalOnChange(null);
      }
      return;
    }
    const result = preprocessOnChangeValues([option], input, {
      startIdx: inputRef.current?.selectionStart || 0,
      endIdx: inputRef.current?.selectionEnd || 0,
    });

    if (result.input && inputRef.current) {
      setInput(result.input);
      inputRef.current.value = result.input;
    }
    if (result.options) {
      setSelectedOption(result.options[0]);
      setInput('');
      if (externalOnChange) {
        externalOnChange(result.options[0]);
      }
    }
  };

  return (
    <FUIComboboxContext.Provider
      value={{
        options,
        selectedOptions: selectedOption ? [selectedOption] : [],
        generateOptions,
        handleSetInput: setInput,
        inputRef,
        comboboxRef,
        input,
        handleCaretChange,
        textSelection,
        allowCustomValues,
      }}
    >
      <Combobox
        {...props}
        ref={comboboxRef}
        immediate
        value={selectedOption}
        onChange={onChange}
        as={props.as || 'div'}
      />
    </FUIComboboxContext.Provider>
  );
}
