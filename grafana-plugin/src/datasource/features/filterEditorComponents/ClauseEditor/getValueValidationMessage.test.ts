import { VariableInterpolation } from '@grafana/runtime';
import { ColumnMetadata } from 'public-domain';

import { mockedReplaceFnInputOutputMap, mockedTypedVariableModels } from 'datasource/features/variables/mocks';

import { getValueValidationMessage } from './getValueValidationMessage';

jest.mock('@grafana/runtime', () => ({
  getTemplateSrv: () => ({
    replace: (template: string, interpolations: VariableInterpolation[]) => {
      const foundInterpolations = mockedReplaceFnInputOutputMap[template];
      interpolations.push(...(foundInterpolations || []));
      return template;
    },
    getVariables: () => mockedTypedVariableModels,
  }),
}));

describe('getValidationMessage', () => {
  const numberColumnMetadata: ColumnMetadata = {
    type: 'number',
  } as ColumnMetadata;

  const stringColumnMetadata: ColumnMetadata = {
    type: 'string',
  } as ColumnMetadata;

  it('should return null if no validation problems for number column', () => {
    const result = getValueValidationMessage('123', numberColumnMetadata);
    expect(result).toBeNull();
  });

  it('should return null if no validation problems for string column', () => {
    const result = getValueValidationMessage('asd', stringColumnMetadata);
    expect(result).toBeNull();
  });

  it('should return error message if value is invalid for number column', () => {
    const result = getValueValidationMessage('asd', numberColumnMetadata);
    expect(result).toEqual('Literal "asd" does not match required type "number"');
  });

  it('should return error message if variable is invalid for number column', () => {
    const result = getValueValidationMessage('${var}', numberColumnMetadata);
    expect(result).toEqual('Variable "var" is not defined in the dashboard');
  });

  it('should return error message if variable is invalid for string column', () => {
    const result = getValueValidationMessage('${var}', stringColumnMetadata);
    expect(result).toEqual('Variable "var" is not defined in the dashboard');
  });

  it('should return error message if variable is invalid for string column', () => {
    const result = getValueValidationMessage('${var}', stringColumnMetadata);
    expect(result).toEqual('Variable "var" is not defined in the dashboard');
  });

  it('should return null if variable is valid for string column', () => {
    const result = getValueValidationMessage('${JOBNAME}', stringColumnMetadata);
    expect(result).toBeNull();
  });

  it('should return null if there are multiple valid variables for string column', () => {
    const result = getValueValidationMessage('${JOBNAME}${JOBNAME}', stringColumnMetadata);
    expect(result).toBeNull();
  });

  it('should return error if there are multiple valid variables for number column', () => {
    const result = getValueValidationMessage('${JOBNAME}${JOBNAME}', numberColumnMetadata);
    expect(result).toEqual('Literal "${JOBNAME}${JOBNAME}" does not match required type "number"');
  });

  it('should return concatinated error message if there are multiple errors for number column', () => {
    const result = getValueValidationMessage('asd${var1}${var2}', numberColumnMetadata);
    expect(result).toEqual(
      'Literal "asd${var1}${var2}" does not match required type "number". Variable "var1" is not defined in the dashboard. Variable "var2" is not defined in the dashboard.'
    );
  });

  it('should return concatinated error message if there are multiple errors for number column', () => {
    const result = getValueValidationMessage('asd${var1}${var2}', stringColumnMetadata);
    expect(result).toEqual(
      'Variable "var1" is not defined in the dashboard. Variable "var2" is not defined in the dashboard.'
    );
  });
});
