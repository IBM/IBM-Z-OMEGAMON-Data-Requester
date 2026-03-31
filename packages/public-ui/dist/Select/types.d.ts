/**
 * Defines a range of character position in a string.
 * Helps to track position for variable insert, highlight variables or errors in selected options.
 */
export type TextSelection = {
    startIdx: number;
    endIdx: number;
};
/**
 * apply function is adjustment on Option type to improve usage of it in string environment.
 * Based on function implementation, it will inject option value into string on selection position.
 * It collaborates a lot with OptionsPreprocessor.
 */
export type Option = {
    id: number | string;
    value: string;
    label?: string;
    disabled?: boolean;
    isNewCustom?: boolean;
    apply(this: Option, inputText: string, selection: TextSelection): string;
};
export type ComboboxState = {
    input?: string;
    options?: Option[];
};
export type OnChangePreprocessor = (options: Option[], input: string, selection: TextSelection) => ComboboxState;
export type OptionsGenerator = (options: Option[], selectedOptions: Option[], inputValue: string, cursorPosition?: number, allowCustomValues?: boolean) => Option[];
