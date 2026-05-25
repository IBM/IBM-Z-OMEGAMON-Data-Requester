export type LiteralPatternItem = { type: 'literal'; value: string };
export type VariablePatternItem = { type: 'variable'; name: string };

export type PatternItem = LiteralPatternItem | VariablePatternItem;

export interface ActionCommand {
  pattern: PatternItem[];
  variableAliases: Record<string, string[]>;
}

export type ActionDefinition = {
  id: string;
  affinityId: string;
  name: string;
  command: ActionCommand;
  version: number;
};

export type Action = {
  definition: ActionDefinition;
  agentId: string;
  variableMapping: VariableMapping;
};

export type ActionResult = {
  returnCode: string;
  message: string;
};

export type ActionStatus = 'completed' | 'failed' | 'inProgress';

export type ActionResultWithStatus = ActionResult & {
  status: ActionStatus;
};

export type VariableMapping = { [variableName: string]: string };

export type ActionValidationError =
  | ActionNotSpecifiedError
  | DestinationSystemValidationError
  | ActionVariableMappingError;

export type ActionNotSpecifiedError = {
  type: 'actionNotSpecified';
};

export type DestinationSystemValidationError = {
  type: 'destinationNotSpecified';
};

export type ActionVariableMappingError = {
  type: 'variablesError';
  variableErrors: { [variableName: string]: 'notSpecified' };
};

export function validateAction(action: Partial<Action>): ActionValidationError[] {
  const errors: ActionValidationError[] = [];
  if (!action.definition) {
    errors.push({ type: 'actionNotSpecified' });
    return errors;
  }

  if (!action.agentId) {
    errors.push({ type: 'destinationNotSpecified' });
  }

  const variableNames = action.definition.command.pattern
    .filter((item) => item.type === 'variable')
    .map((item) => item.name);

  const variableErrors = variableNames.reduce(
    (acc, name) => {
      if (!action.variableMapping || !action.variableMapping[name]?.trim()) {
        acc[name] = 'notSpecified';
      }
      return acc;
    },
    {} as { [variableName: string]: 'notSpecified' }
  );

  if (Object.keys(variableErrors).length > 0) {
    errors.push({ type: 'variablesError', variableErrors });
  }

  return errors;
}

export function isActionDefined(action: Partial<Action>): action is Action {
  const validationErrors = validateAction(action);
  return validationErrors.length === 0;
}
