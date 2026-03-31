import { ScopedVars } from '@grafana/data';
import { FilterCombinationResult, throwIfNullish } from 'public-common';
import { TableMetadata, ColumnMetadata } from 'public-domain';

import { MetricsQueryFilters, MetricsQueryFilterClause, MetricsQueryFilter } from 'datasource/domain';
import { transformMetricsQueryFilters } from 'datasource/domain/filters';

import { TemplateVariablesDetails } from './TemplateVariablesDetails';

/**
 * Throws if any template in filters contains variables that are not found in dashboard.
 *
 * Applies variables,
 * potentially changes filters structure (if e.g. some clause uses variable that has multiple values selected or ALL value selected),
 * reverse-formats values of those clauses that had variables applied.
 */
export function applyVariablesInFilters(
  metricsQueryFilters: MetricsQueryFilters,
  tableMd: TableMetadata,
  scopedVars: ScopedVars
): MetricsQueryFilters {
  const transformer = (clause: MetricsQueryFilterClause) => {
    const columnMd = tableMd.columns[clause.columnId];
    throwIfNullish(columnMd, `Table metadata should contain at least column metadata for the column in the clause`);
    return handleClause(clause, columnMd, scopedVars);
  };
  return transformMetricsQueryFilters(metricsQueryFilters, transformer);
}

function handleClause(
  clause: MetricsQueryFilterClause,
  columnMd: ColumnMetadata,
  scopedVars: ScopedVars
): FilterCombinationResult<MetricsQueryFilterClause> {
  const template = clause.userDefinedValue.toString();
  const templateVariablesDetails = new TemplateVariablesDetails(template, scopedVars);

  if (!templateVariablesDetails.containsVariables()) {
    return { clause };
  }

  if (templateVariablesDetails.hasUnspecifiedAllSelected()) {
    if (!templateVariablesDetails.isSingleVariableExpression()) {
      throw new Error(
        `The provided template "${template}" does not match the expected format for variables with value "All"`
      );
    }
    return 'always_true';
  }

  const filledTemplateVariations = templateVariablesDetails.getVariations();

  if (filledTemplateVariations.length > 1) {
    return handleClauseWithMultipleValues(clause, filledTemplateVariations);
  }

  const processedClause: MetricsQueryFilterClause = {
    ...clause,
    userDefinedValue: filledTemplateVariations[0],
  };
  return { clause: processedClause };
}

function handleClauseWithMultipleValues(clause: MetricsQueryFilterClause, varValues: string[]): MetricsQueryFilter {
  const multivalueClauses = varValues.map((value) => {
    const processedClause = { ...clause, userDefinedValue: value };
    const processedFilter: MetricsQueryFilter = { clause: processedClause };
    return processedFilter;
  });
  return { or: multivalueClauses };
}

export const testExports = {
  handleClause,
  handleClauseWithMultipleValues,
};
