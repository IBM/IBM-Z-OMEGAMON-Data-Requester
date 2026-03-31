import { useRef as u, useEffect as n } from "react";
function f(r) {
  const e = u(void 0);
  return n(() => {
    e.current = r;
  }), e.current;
}
export {
  f as usePrevious
};
