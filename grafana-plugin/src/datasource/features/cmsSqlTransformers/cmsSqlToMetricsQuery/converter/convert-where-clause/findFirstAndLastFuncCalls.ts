import {
  ConverterError,
  TokenMapping,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter/internals';
import {
  identifierIs,
  FunctionCall,
  getFullIdentifierName,
  getNodeTokens,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';

import { findExpressions } from './findExpressions';
import { IntermediateFilterExpression, IntermediateFilter } from './intermediateFilter';

type FirstLastExistingFindResult = {
  first?: number;
  filterNode: IntermediateFilterExpression;
};

type FirstLastNotExistingFindResult = {
  first?: undefined;
  filterNode: null;
};

export type FirstLastFindResult = FirstLastExistingFindResult | FirstLastNotExistingFindResult;

export function findFirstAndLastFuncCalls(root: IntermediateFilter, mapping: TokenMapping): FirstLastFindResult {
  const paths = findExpressions(root, (expr) => {
    if (expr.nodeType !== 'function_call') {
      return false;
    }
    const { funcIdentifier } = expr;
    return identifierIs(funcIdentifier, 'FIRST') || identifierIs(funcIdentifier, 'LAST');
  });

  if (paths.length > 1) {
    const nodes = paths.map(([funcCall]) => funcCall.expression);
    throw new ConverterError('Only one call to FIRST or LAST functions allowed', nodes);
  }

  const [firstPath] = paths;
  if (!firstPath) {
    return {
      filterNode: null,
    };
  }

  const [funcNode, parentIfAny] = firstPath;
  const asFunction = funcNode.expression as FunctionCall;
  if (!asFunction) {
    // Should never happen
    throw new ConverterError('Function call is expected', []);
  }

  if (funcNode !== root && parentIfAny !== root) {
    throw new ConverterError('FIRST and LAST functions are only allowed on top level of WHERE clause', [asFunction]);
  }

  const { funcIdentifier, args } = asFunction;
  if (identifierIs(funcIdentifier, 'LAST')) {
    throw new ConverterError(`'LAST' function is not supported`, [asFunction]);
  }

  const [arg] = args;
  if (!arg || args.length > 1) {
    const funcName = getFullIdentifierName(funcIdentifier);
    throw new ConverterError(`'${funcName}' function should have one and only one integer argument`, [asFunction]);
  }

  if (arg.nodeType !== 'value') {
    throw new ConverterError('Literal or value is expected', [arg]);
  }

  const value = arg.asUserDefinedValue;
  if (typeof value !== 'number') {
    const funcName = getFullIdentifierName(funcIdentifier);
    throw new ConverterError(`'${funcName}' function only accepts integer arguments`, args);
  }

  mapping.registerRootAttachedNodes(getNodeTokens(asFunction), 'first');

  return {
    first: identifierIs(funcIdentifier, 'FIRST') ? value : undefined,
    filterNode: funcNode,
  };
}
