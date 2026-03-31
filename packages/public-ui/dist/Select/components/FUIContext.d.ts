import { Option, OptionsGenerator, TextSelection } from '..';
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
export declare const FUIComboboxContext: import('react').Context<FUIMultiComboboxContextType>;
export {};
