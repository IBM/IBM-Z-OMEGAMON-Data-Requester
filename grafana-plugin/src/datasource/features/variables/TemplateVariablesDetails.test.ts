import { ScopedVars } from '@grafana/data';
import { VariableInterpolation } from '@grafana/runtime';

import { mockedReplaceFnInputOutputMap, scopedVars, mockedTypedVariableModels } from './mocks';
import { TemplateVariablesDetails } from './TemplateVariablesDetails';

jest.mock('@grafana/runtime', () => ({
  getTemplateSrv: () => ({
    replace: (template: string, scopedVars: ScopedVars, format: string, interpolations: VariableInterpolation[]) => {
      const foundInterpolations = mockedReplaceFnInputOutputMap[template];
      interpolations.push(...(foundInterpolations || []));
      return template;
    },
    getVariables: () => {
      return mockedTypedVariableModels;
    },
  }),
}));

describe('getVariations', () => {
  it('should return single value for variable that is non-multivalue', () => {
    const singleValueVariableTemplateDetails = new TemplateVariablesDetails('$ORIGINNODE', scopedVars);
    expect(singleValueVariableTemplateDetails.getVariations()).toMatchSnapshot();
  });
  it('should return single value for variable that is multi-value and has single value selected', () => {
    const singleValueSelectedTemplateDetails = new TemplateVariablesDetails('${MVSID}', scopedVars);
    expect(singleValueSelectedTemplateDetails.getVariations()).toMatchSnapshot();
  });
  it('should return empty array for variable that is multi-value but no value is selected', () => {
    const noValueSelectedTemplateDetails = new TemplateVariablesDetails('${CICSID}', scopedVars);
    expect(noValueSelectedTemplateDetails.getVariations()).toEqual([]);
  });
  it('should return all possible strings variations for template with multiple variables', () => {
    const multiVariableTemplateDetails = new TemplateVariablesDetails(
      'foo${JOBNAME}bar${SVCCLASS}baz$STEPNAME',
      scopedVars
    );
    expect(multiVariableTemplateDetails.getVariations()).toMatchSnapshot();
  });
  it('should return the provided custom "All" value when it is specified', () => {
    const specifiedAllTemplateDetails = new TemplateVariablesDetails('${DB2SUBSYSTEM}', scopedVars);
    expect(specifiedAllTemplateDetails.getVariations()).toMatchSnapshot();
  });
  it('should return all possible values for the variable when unspecified "All" is selected', () => {
    const unspecifiedAllTemplateDetails = new TemplateVariablesDetails('${VLUNAME}', scopedVars);
    expect(unspecifiedAllTemplateDetails.getVariations()).toMatchSnapshot();
  });
  it('should return the received string unchanged when the string does not contain a variable', () => {
    const noVariableTemplateDetails = new TemplateVariablesDetails('JOBNAME', scopedVars);
    expect(noVariableTemplateDetails.getVariations()).toMatchSnapshot();
  });
  it('should throw error when the template that uses wrong variable type is received', () => {
    const intervalVariablesTemplateDetails = new TemplateVariablesDetails('${INTERVAL}', scopedVars);
    expect(() => intervalVariablesTemplateDetails.getVariations()).toThrowError(
      'Variable "${INTERVAL}" with type "interval" is not supported in this context'
    );
  });
  it('should throw error when variable is not found in dashboard', () => {
    expect(() => {
      const nonExistingVariablesTemplateDetails = new TemplateVariablesDetails('$VarNotFoundInDashboard', scopedVars);
      nonExistingVariablesTemplateDetails.getVariations();
    }).toThrowError('There is no variable information for "$VarNotFoundInDashboard"');
  });
});

describe('hasUnspecifiedAllSelected', () => {
  it('should return false when variable has specified custom "All"', () => {
    const specifiedAllTemplateDetails = new TemplateVariablesDetails('${DB2SUBSYSTEM}', scopedVars);
    expect(specifiedAllTemplateDetails.hasUnspecifiedAllSelected()).toBe(false);
  });
  it('should return false when none of template variables has "All" value', () => {
    const multiVariableTemplateDetails = new TemplateVariablesDetails(
      'foo${JOBNAME}bar${SVCCLASS}baz$STEPNAME',
      scopedVars
    );
    expect(multiVariableTemplateDetails.hasUnspecifiedAllSelected()).toBe(false);
  });
  it('should return true when unspecified "All" is selected in one of the few template variables', () => {
    const unspecifiedAllTemplateDetails = new TemplateVariablesDetails('${VLUNAME}${DB2SUBSYSTEM}', scopedVars);
    expect(unspecifiedAllTemplateDetails.hasUnspecifiedAllSelected()).toBe(true);
  });
  it('should return true when template has single variable with unspecified "All" value', () => {
    const singleUnspecifiedAllTemplateDetails = new TemplateVariablesDetails('${VLUNAME}', scopedVars);
    expect(singleUnspecifiedAllTemplateDetails.hasUnspecifiedAllSelected()).toBe(true);
  });
});

describe('isSingleVariableExpression', () => {
  it('should return true when provided template is single variable expression, so it is equal to first variable match', () => {
    const singleExpressionVariablesDetails = new TemplateVariablesDetails('${DB2SUBSYSTEM}', scopedVars);
    expect(singleExpressionVariablesDetails.isSingleVariableExpression()).toEqual(true);
  });
  it('should return false when provided template is not a single variable expression and is not equal to first found variable match', () => {
    const multiVariableTemplateDetails = new TemplateVariablesDetails(
      'foo${JOBNAME}bar${SVCCLASS}baz$STEPNAME',
      scopedVars
    );
    expect(multiVariableTemplateDetails.isSingleVariableExpression()).toEqual(false);
  });
  it('should return false when provided template is empty', () => {
    const emptyTemplateVariablesDetails = new TemplateVariablesDetails('', scopedVars);
    expect(emptyTemplateVariablesDetails.isSingleVariableExpression()).toEqual(false);
  });
  it('should return false when provided template does not contain a variable', () => {
    const noVariableTemplateVariablesDetails = new TemplateVariablesDetails('NoVarsTemplate', scopedVars);
    expect(noVariableTemplateVariablesDetails.isSingleVariableExpression()).toEqual(false);
  });
  it('should return false when provided template contains variable syntax and literal', () => {
    const mixedSyntaxTemplateVariablesDetails = new TemplateVariablesDetails('${MVSID}test', scopedVars);
    expect(mixedSyntaxTemplateVariablesDetails.isSingleVariableExpression()).toEqual(false);
  });
  it('should return false when provided template contains two variables', () => {
    const twoVariablesTemplateVariablesDetails = new TemplateVariablesDetails('${MVSID}${SVCCLASS}', scopedVars);
    expect(twoVariablesTemplateVariablesDetails.isSingleVariableExpression()).toEqual(false);
  });
  it('should return false when provided template contains two variables that are the same', () => {
    const twoSameVariablesTemplateVariablesDetails = new TemplateVariablesDetails('${MVSID}${MVSID}', scopedVars);
    expect(twoSameVariablesTemplateVariablesDetails.isSingleVariableExpression()).toEqual(false);
  });
});
