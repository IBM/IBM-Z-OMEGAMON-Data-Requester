import { createContext as e } from "react";
//#region src/Select/components/FUIContext.tsx
var t = e({
	comboboxRef: { current: null },
	inputRef: { current: null },
	options: [],
	generateOptions: () => [],
	handleCaretChange: () => {},
	handleSetInput: (e) => {},
	selectedOptions: [],
	input: "",
	textSelection: {
		startIdx: 0,
		endIdx: 0
	}
});
//#endregion
export { t as FUIComboboxContext };
