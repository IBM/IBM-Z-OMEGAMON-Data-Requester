import { ApplicationMetadata, TableMetadata } from 'public-domain';

import {
  MetricsQueryParams,
  MetricsQueryFilter,
  MetricsQueryFilterClause,
  MetricsQueryParma,
  SourceDef,
} from 'datasource/domain';
import { stringifyAgentDef } from 'datasource/domain/agentDefUtils';
import { KNOWN_CMS_SQL_KEYWORDS } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';
import { reverseFormatAndApplyEnums } from 'datasource/features/formatting/reverseFormat';
import { hasVariable } from 'datasource/features/variables/utils';

export function convertMetricsQueryToCmsSql(
  params: MetricsQueryParams,
  possibleTableMetadata: TableMetadata | null,
  applications: ApplicationMetadata[]
): string {
  const applicationCode =
    applications.find((application) => application.affinityEntity.id === params.affinityId)?.applicationCode ?? '';
  const tableId = params.tableId ?? '';
  const selectString = `SELECT ${getSelectColumns(params)}`;
  const fromString = ` FROM ${applicationCode}.${tableId}`;
  const historyString = params.history ? ' HISTORY()' : '';
  const whereString = getWhereCondition(params, possibleTableMetadata);
  const groupByString = params.groupBy.length ? ` GROUP BY ${params.groupBy.join(', ')}` : '';
  const orderByString = params.orderBy.length
    ? ` ORDER BY ${params.orderBy.map((el) => `${el.columnId} ${el.type}`).join(', ')}`
    : '';

  const result = selectString + fromString + historyString + whereString + groupByString + orderByString + ';';
  return result;
}

function getSelectColumns(params: MetricsQueryParams): string {
  if (!params.columns?.length) {
    return '';
  }
  const selectArray = params.columns.map((column) => {
    const id = KNOWN_CMS_SQL_KEYWORDS.includes(column.id.toLocaleLowerCase())
      ? `${params.tableId}.${column.id}`
      : column.id;
    return column.aggregationFunction ? `${column.aggregationFunction}(${id})` : id;
  });
  return selectArray.join(', ');
}

function getWhereCondition(params: MetricsQueryParams, possibleTableMetadata: TableMetadata | null): string {
  const whereArray: string[] = [];
  if (possibleTableMetadata && params.filter.nonAggregated) {
    whereArray.push(getFilterCondition(params.filter.nonAggregated, possibleTableMetadata));
  }
  if (params.first) {
    whereArray.push(`FIRST(${params.first})`);
  }
  if (params.parmas.length) {
    whereArray.push(getQueryParmaCondition(params.parmas));
  }
  if (params.agentsAndGroups.length) {
    whereArray.push(getAgentsAndGroupsCondition(params.agentsAndGroups));
  }

  if (whereArray.length === 0) {
    return '';
  }
  return ` WHERE ${whereArray.filter((el) => el !== '').join(' AND ')}`;
}

function getFilterCondition(filter: MetricsQueryFilter, tableMetadata: TableMetadata): string {
  if (filter.and) {
    const processedValue = filter.and.map((el) => getFilterCondition(el, tableMetadata));
    const wholeString = processedValue.join(` AND `);
    return `(${wholeString})`;
  }
  if (filter.or) {
    const processedValue = filter.or.map((el) => getFilterCondition(el, tableMetadata));
    const wholeString = processedValue.join(` OR `);
    return `(${wholeString})`;
  }
  if (filter.clause) {
    return buildClause(filter.clause, tableMetadata);
  }
  return '';
}

function buildClause(clause: MetricsQueryFilterClause, tableMetadata: TableMetadata): string {
  const value = getClauseValue(clause, tableMetadata);
  return `${clause.columnId} ${clause.operator} ${value}`;
}

const quoteRegex = /'/g;
const doubleQuoteRegex = /"/g;
function escapeString(literal: string): string {
  return literal.replace(quoteRegex, "''").replace(doubleQuoteRegex, '""');
}

function getClauseValue(clause: MetricsQueryFilterClause, tableMetadata: TableMetadata): string {
  const columnMd = tableMetadata.columns[clause.columnId];
  if (!columnMd) {
    return `'${escapeString(clause.userDefinedValue)}'`;
  }
  const isVariable = hasVariable(clause.userDefinedValue);
  let formattedValue: string | number;
  if (!isVariable) {
    try {
      formattedValue = reverseFormatAndApplyEnums(clause.userDefinedValue, columnMd);
    } catch (error) {
      return `'${escapeString(clause.userDefinedValue)}'`;
    }
  } else {
    formattedValue = clause.userDefinedValue;
  }

  return columnMd.type === 'number' ? `${formattedValue}` : `'${escapeString(String(formattedValue))}'`;
}

function getQueryParmaCondition(parmas: MetricsQueryParma[]): string {
  return parmas
    .map((el) => {
      const parmaValue = `'${el.name}'` + (el.value ? `, '${el.value}'` : '') + (el.length ? `, ${el.length}` : '');
      return `SYSTEM.PARMA(${parmaValue})`;
    })
    .join(' AND ');
}

function getAgentsAndGroupsCondition(agentsAndGroups: SourceDef[]): string {
  if (agentsAndGroups.length === 0) {
    return '';
  }
  const agentsAndGroupsAggregation = agentsAndGroups.map((agentDef) => stringifyAgentDef(agentDef)).join(', ');
  return `SYSTEM.PARMA('NODELIST', '${agentsAndGroupsAggregation}', ${agentsAndGroupsAggregation.length})`;
}
