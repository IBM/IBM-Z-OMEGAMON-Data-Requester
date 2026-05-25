import { useEffect as e, useRef as t } from "react";
//#region src/functions/usePrevious.ts
function n(n) {
	let r = t(void 0);
	return e(() => {
		r.current = n;
	}), r.current;
}
//#endregion
export { n as usePrevious };
