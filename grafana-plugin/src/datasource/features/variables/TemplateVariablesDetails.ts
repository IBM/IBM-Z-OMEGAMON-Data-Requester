import { TypedVariableModel, ScopedVars, VariableType, CustomVariableModel, QueryVariableModel } from '@grafana/data';
import { VariableInterpolation, getTemplateSrv } from '@grafana/runtime';
import { normalizeToArray } from 'public-common';

import { getVariablesFromStr } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { emptyStringFiller } from './emptyStringFiller';

const ALL_VAR_VALUE = '$__all';

type VariableInfo = {
  interpolation: VariableInterpolation;
  model: TypedVariableModel;
  /** The Grafana's interpretation of an empty string as custom "All" value is not explicitly defined. */
  customAllValue?: string;
  isAllSelected: boolean;
};

/** This class encapsulates details about a variable template acquired from the Grafana. */
export class TemplateVariablesDetails {
  private template: string;
  /** An object containing Grafana's environments scoped variables. */
  private scopedVars: ScopedVars;
  /** An array of variable information objects that are used within the template. Please don't use it. */
  private usedVariables: VariableInfo[];

  /**
   * Throws if template contains variables that are not found in dashboard
   */
  constructor(template: string, scopedVars: ScopedVars) {
    this.template = template;
    this.scopedVars = scopedVars;
    this.usedVariables = [];
    if (!getVariablesFromStr(template, 0).length) {
      return;
    }
    const interpolations = this.getVariableInterpolations();
    this.usedVariables = interpolations.map((interpolation) => {
      const model = TemplateVariablesDetails.getVariableModel(interpolation.variableName);
      if (!model) {
        throw new Error(`There is no variable information for "${interpolation.match}"`);
      }

      const isAllSelected = TemplateVariablesDetails.isCurrentValueAll(model);
      const customAllValue = isAllSelected && model.allValue ? model.allValue : undefined;

      return { interpolation, model, customAllValue, isAllSelected };
    });
  }

  containsVariables() {
    return this.usedVariables.length !== 0;
  }

  getVariations(): [string, ...string[]] {
    return this.applyVariations(this.template, this.usedVariables);
  }

  private applyVariations(template: string, variablesInfo: VariableInfo[]): [string, ...string[]] {
    const [firstVariableInfo, ...restVariablesInfo] = variablesInfo;
    if (!firstVariableInfo) {
      return [template];
    }

    const { match } = firstVariableInfo.interpolation;
    const variableValues = TemplateVariablesDetails.getCurrentValues(firstVariableInfo);
    const resultVariations: string[] = variableValues.flatMap((value) => {
      const filledTemplate = template.replace(match, value);
      return this.applyVariations(filledTemplate, restVariablesInfo);
    });
    return resultVariations as [string, ...string[]];
  }

  /** Returns true if template contains only single variable and nothing else (not even literals)
   * '$Variable' -> true
   * '${Variable}' -> true
   * '${Variable}test' -> false
   * '${Variable}${Variable}' -> false
   */
  isSingleVariableExpression(): boolean {
    return this.usedVariables[0]?.interpolation.match === this.template;
  }

  /** This method verifies whether any variable within the "usedVariables" has "All" selected without a custom value specified */
  hasUnspecifiedAllSelected(): boolean {
    /* The Grafana's interpretation of an empty string as custom "All" value is not explicitly defined.
     * Therefore we handle both empty strings and undefined values in the same manner. */
    return this.usedVariables.some((usedVariable) => usedVariable.isAllSelected && !usedVariable.customAllValue);
  }

  private static getCurrentValues(variableInfo: VariableInfo): string[] {
    if (!TemplateVariablesDetails.variableHasType(variableInfo, ['query', 'custom', 'constant', 'textbox'] as const)) {
      throw new Error(
        `Variable "${variableInfo.interpolation.match}" with type "${variableInfo.model.type}" is not supported in this context`
      );
    }
    const { model } = variableInfo;
    if (variableInfo.isAllSelected) {
      /* The Grafana's interpretation of an empty string as custom "All" value is not explicitly defined.
       * Therefore we handle both empty strings and undefined values in the same manner. */
      if (variableInfo.customAllValue) {
        return [variableInfo.customAllValue];
      }
      // In Grafana, option value can be represented as either a single string or an array of strings, which is why we utilize 'flatMap'.
      return model.options.filter((option) => option.value !== ALL_VAR_VALUE).flatMap((option) => option.value);
    }

    // We turned empty strings into <empty value> in query variable values
    const fixedValues = normalizeToArray(model.current.value).map((value) =>
      value === emptyStringFiller ? '' : value
    );

    return fixedValues;
  }

  private static getVariableModel(variableName: string): TypedVariableModel | null {
    const variablesModels = getTemplateSrv().getVariables();
    const variableModel = variablesModels.find((variable) => variable.name === variableName);
    return variableModel ?? null;
  }

  private getVariableInterpolations(): VariableInterpolation[] {
    const variableInterpolations: VariableInterpolation[] = [];
    getTemplateSrv().replace(this.template, this.scopedVars, '', variableInterpolations);
    return variableInterpolations;
  }

  private static variableHasType<T extends readonly VariableType[]>(
    variableInfo: VariableInfo,
    types: T
  ): variableInfo is VariableInfo & { model: { type: T[number] } } {
    return types.includes(variableInfo.model.type);
  }

  private static isCurrentValueAll(
    varInfo: TypedVariableModel | null
  ): varInfo is CustomVariableModel | QueryVariableModel {
    if (!TemplateVariablesDetails.variableSupportsAll(varInfo)) {
      return false;
    }
    //  Value is array for multi variable (multi option is true)
    return varInfo.current.value[0] === '$__all' || varInfo.current.value === '$__all';
  }

  private static variableSupportsAll(
    varInfo: TypedVariableModel | null | undefined
  ): varInfo is CustomVariableModel | QueryVariableModel {
    const VARIABLE_TYPES_WITH_ALL_SUPPORT: VariableType[] = ['query', 'custom'];
    return VARIABLE_TYPES_WITH_ALL_SUPPORT.includes(varInfo?.type as VariableType);
  }
}
