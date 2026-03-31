export type LiteralPatternItem = { type: 'literal'; value: string };
export type VariablePatternItem = { type: 'variable'; name: string };

export type PatternItem = LiteralPatternItem | VariablePatternItem;

export interface ActionCommand {
  pattern: PatternItem[];
  variables: string[];
}

export type ActionDefinition = {
  id: string;
  affinityId: string;
  name: string;
  command: ActionCommand;
  version: number;
};

export type Action = {
  id: string;
  agentId: string;
  variableMapping: VariableMapping;
};

export type VariableMapping = { [variableName: string]: string };
