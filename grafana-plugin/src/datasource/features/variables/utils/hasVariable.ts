// Grafana variable name has no specific requirements for the first character
// When used instead of column-name as a
// GROUP BY parameter, $DUMMY
// forces the server to make the extra pass
// through the initial result table required
// to group the rows but without doing any
// actual grouping. This extra pass allows
// the server to use the values of column
// functions (which take one pass to
// compute) in a search condition (in a
// HAVING clause but not a WHERE
// clause) to determine which rows are in
// the final result table.
export const variableRegex = /(?!\$DUMMY)\$\w+|\${\w+}/i;

export function hasVariable(str: string): boolean {
  const match = str.match(variableRegex);
  return match?.[0] === str;
}
