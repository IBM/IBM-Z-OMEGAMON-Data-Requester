// eslint-disable-next-line no-restricted-imports
import { ActionDefinition, ColumnMetadataMap } from '../types';

import { filterActions } from './filterActions';

describe('filterActions', () => {
  const mockColumns: ColumnMetadataMap = {
    FIELD1: {
      id: 'FIELD1',
      name: 'Field 1',
      attributeName: 'attribute1',
      description: 'Test field 1',
      type: 'string',
      maxLength: 100,
      atomize: false,
      version: 1,
      sortType: 'lexical',
      defaultSortDirection: 'A',
      extensions: {},
    },
    FIELD2: {
      id: 'FIELD2',
      name: 'Field 2',
      attributeName: 'attribute2',
      description: 'Test field 2',
      type: 'string',
      maxLength: 100,
      atomize: false,
      version: 1,
      sortType: 'lexical',
      defaultSortDirection: 'A',
      extensions: {},
    },
  };

  const mockActionWithTableVariable: ActionDefinition = {
    id: 'action1',
    name: 'Table Action',
    affinityId: 'test',
    version: 1,
    command: {
      pattern: [],
      variables: ['TestTable.FIELD1', 'TestTable.FIELD2'],
    },
  };

  const mockActionWithAttributeVariable: ActionDefinition = {
    id: 'action2',
    name: 'Attribute Action',
    affinityId: 'test',
    version: 1,
    command: {
      pattern: [],
      variables: ['attribute1'],
    },
  };

  const mockActionWithMixedVariables: ActionDefinition = {
    id: 'action3',
    name: 'Mixed Action',
    affinityId: 'test',
    version: 1,
    command: {
      pattern: [],
      variables: ['attribute1', 'nonexistent'],
    },
  };

  const mockActionWithNoValidVariables: ActionDefinition = {
    id: 'action4',
    name: 'Invalid Action',
    affinityId: 'test',
    version: 1,
    command: {
      pattern: [],
      variables: ['nonexistent1', 'nonexistent2'],
    },
  };

  const mockActionWithAllValidAttributes: ActionDefinition = {
    id: 'action5',
    name: 'All Valid Action',
    affinityId: 'test',
    version: 1,
    command: {
      pattern: [],
      variables: ['attribute1', 'attribute2'],
    },
  };

  test('should include actions from big array', () => {
    const result = filterActions(
      [mockActionWithTableVariable, mockActionWithNoValidVariables, mockActionWithMixedVariables],
      'TestTable',
      mockColumns
    );
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('action1');
  });

  test('should include actions with table-prefixed variables', () => {
    const result = filterActions([mockActionWithTableVariable], 'TestTable', mockColumns);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('action1');
  });

  test('should include actions with available attribute variables', () => {
    const result = filterActions([mockActionWithAttributeVariable], 'TestTable', mockColumns);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('action2');
  });

  test('should exclude actions with mixed variables when not all are available', () => {
    const result = filterActions([mockActionWithMixedVariables], 'TestTable', mockColumns);
    expect(result).toHaveLength(0);
  });

  test('should exclude actions with no valid variables', () => {
    const result = filterActions([mockActionWithNoValidVariables], 'TestTable', mockColumns);
    expect(result).toHaveLength(0);
  });

  test('should handle case insensitive table name matching', () => {
    const actionWithLowerCase: ActionDefinition = {
      ...mockActionWithTableVariable,
      command: {
        ...mockActionWithTableVariable.command,
        variables: ['testtable.field1'],
      },
    };

    const result = filterActions([actionWithLowerCase], 'TestTable', mockColumns);
    expect(result).toHaveLength(1);
  });

  test('should handle case insensitive attribute matching', () => {
    const actionWithUpperCase: ActionDefinition = {
      ...mockActionWithAttributeVariable,
      command: {
        ...mockActionWithAttributeVariable.command,
        variables: ['ATTRIBUTE1'],
      },
    };

    const result = filterActions([actionWithUpperCase], 'TestTable', mockColumns);
    expect(result).toHaveLength(1);
  });

  test('should include actions when ALL attributes are available', () => {
    const result = filterActions([mockActionWithAllValidAttributes], 'TestTable', mockColumns);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('action5');
  });
});
