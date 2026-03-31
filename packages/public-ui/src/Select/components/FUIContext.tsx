import { createContext } from 'react';

import { Option, OptionsGenerator, TextSelection } from '~/Select';

type FUIMultiComboboxContextType = {
  options: Option[];
  selectedOptions: Option[];
  generateOptions: OptionsGenerator;
  handleSetInput: (input: string) => void;
  handleCaretChange: () => void;
  handleOnRemove?: (option: Option) => void;
  comboboxRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  input: string;
  textSelection: TextSelection;
  allowCustomValues?: boolean;
  isMulti?: boolean;
};

export const FUIComboboxContext = createContext<FUIMultiComboboxContextType>({
  comboboxRef: { current: null },
  inputRef: { current: null },
  options: [],
  generateOptions: () => {
    return [];
  },
  handleCaretChange: () => {
    return;
  },
  handleSetInput: (_) => {
    return;
  },
  selectedOptions: [],
  input: '',
  textSelection: {
    startIdx: 0,
    endIdx: 0,
  },
});
