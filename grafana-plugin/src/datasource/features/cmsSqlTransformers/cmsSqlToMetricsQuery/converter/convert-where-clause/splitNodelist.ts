/** Split SYSTEM.PARMA("NODELIST", VALUE) value into a list of single human-readable entries.
 * Unlike String.split(','), it ignores commas in function-call-like cases
 */
export function splitNodelist(nodelist: string): string[] {
  const result: string[] = [];

  let currStart = 0;
  let currLevel = 0;
  for (let currIdx = 0; currIdx < nodelist.length; currIdx++) {
    switch (nodelist[currIdx]) {
      case ',': {
        if (currLevel === 0) {
          result.push(nodelist.substring(currStart, currIdx));
          currStart = currIdx + 1;
        }
        break;
      }
      case '(': {
        currLevel++;
        break;
      }
      case ')': {
        currLevel = Math.max(0, currLevel - 1);
      }
    }
  }

  result.push(nodelist.substring(currStart));

  return result.map((s) => s.trim()).filter(Boolean);
}
