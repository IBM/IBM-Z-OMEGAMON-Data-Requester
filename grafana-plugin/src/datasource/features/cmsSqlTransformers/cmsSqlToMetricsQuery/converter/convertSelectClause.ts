import { MetricsQueryColumn, ALLOWED_AGGREGATION_FUNCS, AggregationFuncName } from 'datasource/domain';
import {
  Identifier,
  FunctionCall,
  getFullIdentifierName,
  exprIsIdentifier,
  getAsColumnId,
  getNodeTokens,
  SelectClause,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';

import { ConverterError, TokenMapping } from './internals';

function convertSelectItem(clause: Identifier | FunctionCall, mapping: TokenMapping): MetricsQueryColumn {
  if (clause.nodeType === 'function_call') {
    const funcName = getFullIdentifierName(clause.funcIdentifier);
    if (!ALLOWED_AGGREGATION_FUNCS.includes(funcName as AggregationFuncName)) {
      throw new ConverterError(`Unexpected aggregation function ${funcName}`, [clause.funcIdentifier]);
    }
    if (clause.args.length !== 1) {
      throw new ConverterError('Aggregation function should only contain one column', clause.args);
    }

    const [arg] = clause.args;

    if (!arg) {
      throw new ConverterError('Column name is expected', [clause]);
    }

    if (!exprIsIdentifier(arg)) {
      throw new ConverterError('Identifier is expected', [arg]);
    }

    const columnId = getAsColumnId(arg);

    const column = {
      id: columnId,
      aggregationFunction: funcName as AggregationFuncName,
    };

    mapping.registerTokens(getNodeTokens(clause), column);
    mapping.registerTokens(getNodeTokens(arg), column, 'id');
    mapping.registerTokens(getNodeTokens(clause.funcIdentifier), column, 'aggregationFunction');

    return column;
  }

  const column = {
    id: getAsColumnId(clause),
  };

  const tokens = getNodeTokens(clause);
  mapping.registerTokens(tokens, column);
  mapping.registerTokens(tokens, column, 'id');

  return column;
}

export function convertSelectClause(clause: SelectClause, mapping: TokenMapping): MetricsQueryColumn[] {
  const columns = clause.items.map((childClause) => convertSelectItem(childClause, mapping));
  if (!columns.length) {
    throw new ConverterError('SELECT column list should not be empty', [clause]);
  }
  mapping.registerTokens(getNodeTokens(clause), columns);
  return columns;
}
