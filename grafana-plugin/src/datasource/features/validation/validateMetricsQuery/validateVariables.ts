import { getTemplateSrv } from '@grafana/runtime';

import { MetricsQueryParams, MetricsQueryParma, MetricsQueryFilters, SourceDef } from 'datasource/domain';
import { flattenFilterClauses } from 'datasource/domain/filters';
import { TokenMapping } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter';
import { getVariablesFromStr, Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { ValidationProblem } from './validatorCommon';

export function validateVariables(
  queryObject: MetricsQueryParams,
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem[] {
  const problems = [
    ...validateManagedSystems(queryObject.agentsAndGroups, getTokensOf),
    ...validateFilters(queryObject.filter, getTokensOf),
    ...validateParmas(queryObject.parmas, getTokensOf),
  ];
  return problems;
}

function validateManagedSystems(
  agentsAndGroups: SourceDef[],
  getTokensOf?: TokenMapping['getTokensOf']
): ValidationProblem[] {
  const problems = agentsAndGroups.flatMap((managedSystem, idx) => {
    const tokens = getTokensOf?.(managedSystem);
    switch (managedSystem.id) {
      case 'agentOrGroupName': {
        return validateVariableInValue(managedSystem.name, tokens);
      }
      case 'atLpar': {
        return managedSystem.lpars.flatMap((lpar) => validateVariableInValue(lpar, tokens));
      }
    }
  });

  return problems;
}

function validateParmaName(parma: MetricsQueryParma, getTokensOf?: TokenMapping['getTokensOf']): ValidationProblem[] {
  const hasVariablesInName = getVariablesFromStr(parma.name, 0).length;
  if (hasVariablesInName) {
    return [
      {
        severity: 'error',
        message: "SYSTEM.PARMA doesn't support variables in name",
        affectedTokens: getTokensOf?.(parma, 'name'),
      },
    ];
  }
  return [];
}

function validateParmas(parmas: MetricsQueryParma[], getTokensOf?: TokenMapping['getTokensOf']): ValidationProblem[] {
  const problems: ValidationProblem[] = parmas.flatMap((parma) => {
    const itemProblems: ValidationProblem[] = [];

    itemProblems.push(...validateParmaName(parma, getTokensOf));
    if (parma.value) {
      itemProblems.push(...validateVariableInValue(parma.value, getTokensOf?.(parma, 'value')));
    }
    return itemProblems;
  });

  return problems;
}

function validateFilters(filters: MetricsQueryFilters, getTokensOf?: TokenMapping['getTokensOf']): ValidationProblem[] {
  const clauses = flattenFilterClauses(filters);

  const problems = clauses.flatMap((clause) =>
    validateVariableInValue(clause.userDefinedValue, getTokensOf?.(clause, 'userDefinedValue'))
  );

  return problems;
}

export function validateVariableInValue(value: string | number, affectedTokens?: Token[]): ValidationProblem[] {
  if (typeof value === 'number') {
    return [];
  }

  const availableVariables = getTemplateSrv().getVariables();
  const usedVariablesNames = getVariablesFromStr(value, 0).map((v) => v.varName);

  return usedVariablesNames.reduce((acc: ValidationProblem[], usedVariable: string) => {
    if (usedVariable === '__from' || usedVariable === '__to') {
      return acc;
    }
    const variable = availableVariables.find((variable) => variable.name === usedVariable);
    if (!variable) {
      acc.push({
        severity: 'error',
        message: `Variable "${usedVariable}" is not defined in the dashboard`,
        affectedTokens: affectedTokens ? affectedTokens : [],
      });
      return acc;
    }

    if (variable.type === 'adhoc') {
      acc.push({
        severity: 'error',
        message: 'Adhoc variables are applied automatically and should not be used explicitly in query',
        affectedTokens: affectedTokens ? affectedTokens : [],
      });
      return acc;
    }

    return acc;
  }, []);
}
