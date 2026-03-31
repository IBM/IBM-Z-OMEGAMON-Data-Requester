export type VariableState = {
    insideVariable: false;
} | {
    insideVariable: true;
    varStart: number;
    varEnd: number;
};
export declare const isInsideVariable: (input: string, caretPosition: number) => VariableState;
export declare const extractVarValue: (input: string, variableState: VariableState) => string;
export declare function splitByPossibleVariables(str: string): string[];
