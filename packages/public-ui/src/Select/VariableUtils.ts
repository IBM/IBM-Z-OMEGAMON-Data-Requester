export type VariableState = { insideVariable: false } | { insideVariable: true; varStart: number; varEnd: number };

export const isInsideVariable = (input: string, caretPosition: number): VariableState => {
  if (caretPosition < 0) {
    return {
      insideVariable: false,
    };
  }

  const varBegin = input.lastIndexOf('${', caretPosition);
  const varClosed = input.lastIndexOf('}', caretPosition);
  const varClosedRight = input.indexOf('}', caretPosition + 1);
  const varBeginRight = input.indexOf('${', caretPosition + 1);

  if (varBegin === -1 && varClosed === -1 && varBeginRight === -1 && varClosedRight === -1) {
    return {
      insideVariable: false,
    };
  }

  /**
   * Next if section designed to catch few cases with one condition.
   * Before each condition you will find set of cases which will be handled by it.
   * They are presented as abstract examples where:
   * . is for any character like letter or digit
   * ${ & } are for variable start and end
   * | is for current caret position
   * Example: ......${| is equal to the case that user types some value, opens a variable notation and stops to type
   */
  if (
    // ......${| || ....${....| || ...... ${....|..... || ......${.}..${
    (varBegin >= 0 &&
      varBegin < caretPosition &&
      (varClosed === -1 || varClosed < varBegin) &&
      varBeginRight === -1 &&
      varClosedRight === -1) ||
    // ........${...|}....
    (varBegin >= 0 && varBegin < varClosed && varClosed === caretPosition) ||
    // ......${....|...}...
    (varBegin >= 0 && varClosed < 0 && varBeginRight < 0 && varClosedRight > caretPosition) ||
    // ..${...}....${....|...}...
    (varBegin >= 0 &&
      varClosed >= 0 &&
      varClosed > varBegin &&
      varClosed < caretPosition &&
      varBeginRight < 0 &&
      varClosedRight > caretPosition)
  ) {
    return {
      insideVariable: true,
      varStart: varBegin,
      varEnd: varClosedRight >= 0 ? varClosedRight : varClosed,
    };
  }

  return {
    insideVariable: false,
  };
};

const varValueRegex = /\$\{([^}]*)\}|\$\{([^}]*)$/;

export const extractVarValue = (input: string, variableState: VariableState): string => {
  if (!variableState.insideVariable) {
    return '';
  }

  const extractedVariable =
    variableState.varEnd > 0
      ? input.substring(variableState.varStart, variableState.varEnd)
      : input.substring(variableState.varStart);

  const regexResult = varValueRegex.exec(extractedVariable);

  if (regexResult) {
    return [...regexResult].at(-1) ?? '';
  }
  return '';
};

export function splitByPossibleVariables(str: string): string[] {
  const varBeginning = str.search(/\${(.*?)}/);
  if (varBeginning === -1) {
    return [str];
  }
  const varEnding = str.indexOf('}', varBeginning);
  const stringArray = [str.substring(0, varBeginning), str.substring(varBeginning, varEnding + 1)];

  if (varEnding + 1 < str.length) {
    stringArray.push(...splitByPossibleVariables(str.substring(varEnding + 1)));
  }

  return stringArray;
}
