import { ScopedVars } from '@grafana/data';
import { VariableInterpolation } from '@grafana/runtime';
import { ColumnMetadata } from 'public-domain';

import { MetricsQueryFilters } from 'datasource/domain';

import { testExports, applyVariablesInFilters } from './applyVariablesInFilters';
import {
  compoundFilter,
  noVarInTemplateFilter,
  multiVariablesTemplateFilter,
  allValFilter,
  allInAndFilter,
  allInMultipleClauseAndFilter,
  allInOrFilter,
  complexAllFilter,
  customAllFilter,
  invalidTemplateAllFilter,
  varNotFoundInDashboardFilter,
  mgtstatFilter,
  swpstatFilter,
  frmsusepctFilter,
  singleVarFilter,
  mgtstatClause,
  swpstatClause,
  frmsusepctClause,
  multiValueClause,
  mockedTableMetadata,
  mockedReplaceFnInputOutputMap,
  scopedVars,
  mockedTypedVariableModels,
} from './mocks';

const { handleClause, handleClauseWithMultipleValues } = testExports;

jest.mock('@grafana/runtime', () => ({
  getTemplateSrv: () => ({
    replace: (template: string, scopedVars: ScopedVars, format: string, interpolations: VariableInterpolation[]) => {
      const foundInterpolations = mockedReplaceFnInputOutputMap[template];
      interpolations.push(...(foundInterpolations || []));
      return template;
    },
    getVariables: () => mockedTypedVariableModels,
  }),
}));

describe('applyVariablesInFilters', () => {
  it('should return processed filter with nonAggregated field', () => {
    expect(applyVariablesInFilters(compoundFilter, mockedTableMetadata, scopedVars)).toMatchSnapshot();
  });
  it('should return empty filter when empty filter passed', () => {
    const emptyFilter: MetricsQueryFilters = {};
    expect(applyVariablesInFilters(emptyFilter, mockedTableMetadata, scopedVars)).toEqual(emptyFilter);
  });
  it('should return unchanged filter when there is no variable defined in "userDefinedValue"', () => {
    expect(applyVariablesInFilters(noVarInTemplateFilter, mockedTableMetadata, scopedVars)).toMatchSnapshot();
  });
  it('should return filter with correctly applied variables when complex template filter is received', () => {
    expect(applyVariablesInFilters(multiVariablesTemplateFilter, mockedTableMetadata, scopedVars)).toMatchSnapshot();
  });
  it('should return empty filter, when the variable in clause has "All" selected, and clause has no parent', () => {
    expect(applyVariablesInFilters(allValFilter, mockedTableMetadata, scopedVars)).toEqual({});
  });
  it('should return filter with single clause, when the filter has "and" clause, and variable in child clause has "All" selected', () => {
    expect(applyVariablesInFilters(allInAndFilter, mockedTableMetadata, scopedVars)).toMatchSnapshot();
  });

  it('should return filter with "and" that has multiple clauses, when the "and" filter with more than 2 clauses received, and one of them has "All" selected', () => {
    expect(applyVariablesInFilters(allInMultipleClauseAndFilter, mockedTableMetadata, scopedVars)).toMatchSnapshot();
  });
  it('should return empty filter, when the "or" filter with multiple clause received, and one of its children has "All" selected', () => {
    expect(applyVariablesInFilters(allInOrFilter, mockedTableMetadata, scopedVars)).toEqual({});
  });
  it('should return filter with one clause, when complex filter with "All" is received', () => {
    expect(applyVariablesInFilters(complexAllFilter, mockedTableMetadata, scopedVars)).toMatchSnapshot();
  });
  it('should return filter with applied custom "All" value', () => {
    expect(applyVariablesInFilters(customAllFilter, mockedTableMetadata, scopedVars)).toMatchSnapshot();
  });
  it('should throw error when variables with "All" value is used in invalid format', () => {
    expect(() => applyVariablesInFilters(invalidTemplateAllFilter, mockedTableMetadata, scopedVars)).toThrowError(
      'The provided template "${VLUNAME}test${VLUNAME}" does not match the expected format for variables with value "All"'
    );
  });
  it('should throw error when variable is not found in grafana', () => {
    expect(() => applyVariablesInFilters(varNotFoundInDashboardFilter, mockedTableMetadata, scopedVars)).toThrowError(
      'There is no variable information for "$VarNotFoundInDashboard"'
    );
  });
  it('should correctly handle variables applying', () => {
    expect(applyVariablesInFilters(mgtstatFilter, mockedTableMetadata, scopedVars)).toMatchSnapshot();
    expect(applyVariablesInFilters(swpstatFilter, mockedTableMetadata, scopedVars)).toMatchSnapshot();
    expect(applyVariablesInFilters(frmsusepctFilter, mockedTableMetadata, scopedVars)).toMatchSnapshot();
  });
});

describe('handleClause', () => {
  it('should return unchanged clause, when template contains no variables', () => {
    expect(
      handleClause(
        noVarInTemplateFilter.nonAggregated.clause,
        mockedTableMetadata.columns.DB2ID as ColumnMetadata,
        scopedVars
      )
    ).toEqual({ clause: noVarInTemplateFilter.nonAggregated.clause });
  });

  it('should return clause with interpolated variables and formatted value, when template contains variables', () => {
    expect(
      handleClause(singleVarFilter.clause, mockedTableMetadata.columns.DB2ID as ColumnMetadata, scopedVars)
    ).toMatchSnapshot();
    expect(
      handleClause(mgtstatClause, mockedTableMetadata.columns.MGTSTAT as ColumnMetadata, scopedVars)
    ).toMatchSnapshot();
    expect(
      handleClause(swpstatClause, mockedTableMetadata.columns.SWPSTAT as ColumnMetadata, scopedVars)
    ).toMatchSnapshot();
    expect(
      handleClause(frmsusepctClause, mockedTableMetadata.columns.FRMSUSEPCT as ColumnMetadata, scopedVars)
    ).toMatchSnapshot();
  });

  it('should throw, when template contains variable that is not found in dashboard', () => {
    expect(() => {
      handleClause(
        varNotFoundInDashboardFilter.nonAggregated.clause,
        mockedTableMetadata.columns.JOBNAME as ColumnMetadata,
        scopedVars
      );
    }).toThrow();
  });
});

describe('handleClauseWithMultipleValues', () => {
  it('should return "or" filter, when passed clause and string values', () => {
    expect(handleClauseWithMultipleValues(multiValueClause, ['USSDSYS', 'IMSRGNS', 'SYSSTC'])).toMatchSnapshot();
  });
});
