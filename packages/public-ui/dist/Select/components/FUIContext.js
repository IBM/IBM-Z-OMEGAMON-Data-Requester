import { createContext as t } from "react";
const o = t({
  comboboxRef: { current: null },
  inputRef: { current: null },
  options: [],
  generateOptions: () => [],
  handleCaretChange: () => {
  },
  handleSetInput: (e) => {
  },
  selectedOptions: [],
  input: "",
  textSelection: {
    startIdx: 0,
    endIdx: 0
  }
});
export {
  o as FUIComboboxContext
};
