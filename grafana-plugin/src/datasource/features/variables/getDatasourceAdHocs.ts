import { getTemplateSrv } from '@grafana/runtime';

import { AdHocVariableModel, AdHocVariableFilter } from 'datasource/grafana';

function getDatasourceAdHocsModels(datasourceId: string): AdHocVariableModel[] {
  const templateSrv = getTemplateSrv();
  const variables = templateSrv.getVariables();
  return variables.reduce((acc, variable) => {
    if (variable.type !== 'adhoc') {
      return acc;
    }

    // See https://github.com/grafana/grafana/blob/v9.2.0/public/app/features/templating/template_srv.ts#L115
    const adhocVariable = variable as AdHocVariableModel;
    const variableDsUid = adhocVariable.datasource?.uid;
    if (datasourceId === variableDsUid) {
      return [...acc, adhocVariable];
    }
    // Filters were added to DataQueryRequest for easier access.
    // But they seem to not work with adhocs when datasource is a variable.
    // https://github.com/grafana/grafana/blob/v11.5.1/public/app/features/templating/template_srv.ts#L132
    if (variableDsUid?.startsWith('$') && templateSrv.replace(variableDsUid) === datasourceId) {
      return [...acc, adhocVariable];
    }
    return acc;
  }, [] as AdHocVariableModel[]);
}

export function getDatasourceAdHocsFilters(datasourceId: string): AdHocVariableFilter[] {
  const dashboardAdHocs = getDatasourceAdHocsModels(datasourceId);
  return dashboardAdHocs.flatMap((adHocVariable) => adHocVariable.filters);
}

export function getTableIdsFromAdHocs(datasourceId: string): string[] {
  const dashboardAdHocs = getDatasourceAdHocsModels(datasourceId);
  const adHocVariableNames = dashboardAdHocs.map((dashboardAdHoc) => dashboardAdHoc.name);
  const tableNames = adHocVariableNames.reduce((acc: string[], adHocVariableName) => {
    acc.push(...adHocVariableName.split('__').slice(1));
    return acc;
  }, []);
  return [...new Set(tableNames)];
}
