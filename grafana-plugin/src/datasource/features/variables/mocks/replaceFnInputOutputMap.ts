import { VariableInterpolation } from '@grafana/runtime';

import { varNotFoundInDashboardFilter } from './metricsQueryFilters';
import { templateMocks } from './templates';
import { variableInterpolationMocks } from './variableInterpolations';

type MockedReplaceFnInputOutputMap = {
  [template: string]: VariableInterpolation[];
};

export const mockedReplaceFnInputOutputMap = {
  [templateMocks.invalid]: [variableInterpolationMocks.vluname, variableInterpolationMocks.vluname],

  [templateMocks.jobname]: [variableInterpolationMocks.jobname],
  [templateMocks.stepname]: [variableInterpolationMocks.stepname],
  [templateMocks.svcclass]: [variableInterpolationMocks.svcclass],
  [templateMocks.db2id]: [variableInterpolationMocks.db2id],
  [templateMocks.vluname]: [variableInterpolationMocks.vluname],
  [templateMocks.db2subsystem]: [variableInterpolationMocks.db2subsystem],
  [templateMocks.multiVariables]: [
    variableInterpolationMocks.jobname,
    variableInterpolationMocks.svcclass,
    variableInterpolationMocks.stepname,
  ],
  [varNotFoundInDashboardFilter.nonAggregated.clause.userDefinedValue]: [variableInterpolationMocks.notFound],
  [templateMocks.interval]: [variableInterpolationMocks.interval],
  [templateMocks.vlunameDb2subsystem]: [variableInterpolationMocks.vluname, variableInterpolationMocks.db2subsystem],
  [templateMocks.originnode]: [variableInterpolationMocks.originnode],
  [templateMocks.mvsid]: [variableInterpolationMocks.mvsid],
  [templateMocks.mvsidWithLiteral]: [variableInterpolationMocks.mvsid],
  [templateMocks.mvsidTwoVariables]: [variableInterpolationMocks.mvsid, variableInterpolationMocks.mvsid],
  [templateMocks.twoVariable]: [variableInterpolationMocks.mvsid, variableInterpolationMocks.svcclass],
  [templateMocks.cicsid]: [variableInterpolationMocks.cicsid],
  [templateMocks.mgtstat]: [variableInterpolationMocks.mgtstat],
  [templateMocks.swpstat]: [variableInterpolationMocks.swpstat],
  [templateMocks.frmsusepct]: [variableInterpolationMocks.frmsusepct],
} satisfies MockedReplaceFnInputOutputMap;
