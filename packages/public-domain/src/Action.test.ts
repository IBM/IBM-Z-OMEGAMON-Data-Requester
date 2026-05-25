import { validateAction, type ActionDefinition } from './Action';

const heapDumpActionDefinition: ActionDefinition = {
  id: 'JJCMD003',
  affinityId: '%IBM.JVM_Monitor',
  name: 'Heap Dump',
  command: {
    pattern: [
      { value: 'JJ:', type: 'literal' },
      { name: 'Job_Name', type: 'variable' },
      { value: ' ', type: 'literal' },
      { name: 'JVM_Health_Summary.ASID', type: 'variable' },
      { value: '            ', type: 'literal' },
      { name: 'HEALTH.JVMPID', type: 'variable' },
      { value: ' HEAPDUMP', type: 'literal' },
    ],
    variableAliases: {
      'JVM_Health_Summary.ASID': ['HEALTH.ASID', 'ASID'],
      'HEALTH.JVMPID': ['JVM_Health_Summary.JVMPID', 'JVMPID'],
      Job_Name: ['JVM_Health_Summary.Job_Name', 'HEALTH.JOBNAME', 'JOBNAME'],
    },
  },
  version: 61,
};

const agentId = 'KJJ1:RSC3:JVM';

const allVariablesMapped = {
  Job_Name: 'MYJOB',
  'JVM_Health_Summary.ASID': '1A2B',
  'HEALTH.JVMPID': '42',
};

describe('validateAction', () => {
  describe('missing definition', () => {
    it('returns actionNotSpecified when action is empty', () => {
      expect(validateAction({})).toEqual([{ type: 'actionNotSpecified' }]);
    });

    it('returns only actionNotSpecified even when agentId is present, due to early return', () => {
      expect(validateAction({ agentId })).toEqual([{ type: 'actionNotSpecified' }]);
    });
  });

  it('returns destinationNotSpecified when agentId is absent', () => {
    expect(validateAction({ definition: heapDumpActionDefinition, variableMapping: allVariablesMapped })).toEqual([
      { type: 'destinationNotSpecified' },
    ]);
  });

  describe('variable mapping errors', () => {
    it('returns no errors when the pattern has no variable items', () => {
      const literalOnlyDefinition: ActionDefinition = {
        id: 'JJCMD003',
        affinityId: '%IBM.JVM_Monitor',
        name: 'Ping',
        command: { pattern: [{ value: 'PING', type: 'literal' }], variableAliases: {} },
        version: 1,
      };
      expect(validateAction({ definition: literalOnlyDefinition, agentId })).toEqual([]);
    });

    it('returns variablesError for all variables when variableMapping is absent', () => {
      expect(validateAction({ definition: heapDumpActionDefinition, agentId })).toEqual([
        {
          type: 'variablesError',
          variableErrors: {
            Job_Name: 'notSpecified',
            'JVM_Health_Summary.ASID': 'notSpecified',
            'HEALTH.JVMPID': 'notSpecified',
          },
        },
      ]);
    });

    it('returns variablesError only for variables with empty string values', () => {
      expect(
        validateAction({
          definition: heapDumpActionDefinition,
          agentId,
          variableMapping: { Job_Name: 'MYJOB', 'JVM_Health_Summary.ASID': '', 'HEALTH.JVMPID': '' },
        })
      ).toEqual([
        {
          type: 'variablesError',
          variableErrors: {
            'JVM_Health_Summary.ASID': 'notSpecified',
            'HEALTH.JVMPID': 'notSpecified',
          },
        },
      ]);
    });

    it('returns variablesError for a variable whose value is whitespace only', () => {
      expect(
        validateAction({
          definition: heapDumpActionDefinition,
          agentId,
          variableMapping: { Job_Name: '   ', 'JVM_Health_Summary.ASID': '1A2B', 'HEALTH.JVMPID': '42' },
        })
      ).toEqual([
        {
          type: 'variablesError',
          variableErrors: { Job_Name: 'notSpecified' },
        },
      ]);
    });
  });

  describe('multiple errors', () => {
    it('returns both destinationNotSpecified and variablesError when agentId and mapping are both absent', () => {
      const errors = validateAction({ definition: heapDumpActionDefinition });
      expect(errors).toContainEqual({ type: 'destinationNotSpecified' });
      expect(errors).toContainEqual(expect.objectContaining({ type: 'variablesError' }));
      expect(errors).toHaveLength(2);
    });
  });

  describe('valid action', () => {
    it('returns no errors when all fields are correctly provided', () => {
      expect(
        validateAction({ definition: heapDumpActionDefinition, agentId, variableMapping: allVariablesMapped })
      ).toEqual([]);
    });
  });
});
