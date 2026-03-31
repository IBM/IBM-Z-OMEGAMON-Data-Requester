import { MetricsQueryParma } from 'datasource/domain';
import {
  ConverterError,
  TokenMapping,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/converter/internals';
import { getNodeTokens, identifierIs } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';
import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { findExpressions } from './findExpressions';
import { IntermediateFilterExpression, IntermediateFilter, IntermediateFilterConnection } from './intermediateFilter';

export type ParmasExtractionResult = {
  parma: MetricsQueryParma;
  filterNode: IntermediateFilterExpression;
  tokens: Token[];
};

function extractParma(
  root: IntermediateFilter,
  element: IntermediateFilterExpression,
  parentIfAny: IntermediateFilterConnection | undefined,
  mapping: TokenMapping
): ParmasExtractionResult {
  if (element !== root && parentIfAny !== root) {
    throw new ConverterError('SYSTEM.PARMA function should only be called on top level of WHERE clause', [
      element.expression,
    ]);
  }

  if (parentIfAny && parentIfAny.connector !== 'and_condition_connector') {
    throw new ConverterError('SYSTEM.PARMA function should be connected via AND', [element.expression]);
  }

  const asFunc = element.expression;

  if (asFunc.nodeType !== 'function_call') {
    // Should never happen
    throw new ConverterError('SYSTEM.PARMA call is expected', [asFunc]);
  }

  const { args } = asFunc;
  const [name, value, length] = args;

  if (args.length > 3) {
    throw new ConverterError('SYSTEM.PARMA only takes 3 arguments', [asFunc]);
  }

  if (!name) {
    throw new ConverterError('SYSTEM.PARMA call requires name of the parameter', [asFunc]);
  }

  if (name.nodeType !== 'value') {
    throw new ConverterError('Literal or variable is expected', [name]);
  }

  const nameAsLiteral = name.asUserDefinedValue;
  if (typeof nameAsLiteral !== 'string') {
    throw new ConverterError('SYSTEM.PARMA parameter name should be a string', [name]);
  }

  if (value != null && value.nodeType !== 'value') {
    throw new ConverterError('Literal or variable is expected', [value]);
  }

  const valueAsLiteral = value ? value.asUserDefinedValue : undefined;
  if (typeof valueAsLiteral !== 'string' && typeof valueAsLiteral !== 'undefined') {
    if (!value) {
      // Is not possible
      throw new ConverterError('SYSTEM.PARMA parameter value is incorrectly defined', [asFunc]);
    }
    throw new ConverterError('SYSTEM.PARMA parameter value should be a string (numbers should be wrapped in quotes)', [
      value,
    ]);
  }

  if (length != null && length.nodeType !== 'value') {
    throw new ConverterError('Literal or variable is expected', [length]);
  }

  const lengthAsLiteral = length ? length.asUserDefinedValue : undefined;
  if (typeof lengthAsLiteral !== 'number' && typeof lengthAsLiteral !== 'undefined') {
    if (!length) {
      // Is not possible
      throw new ConverterError('SYSTEM.PARMA parameter length is incorrectly defined', [asFunc]);
    }
    throw new ConverterError('SYSTEM.PARMA parameter length should be an integer', [length]);
  }

  const parma = {
    name: nameAsLiteral,
    value: valueAsLiteral,
    length: lengthAsLiteral,
  };

  const allTokens = getNodeTokens(asFunc);
  mapping.registerTokens(allTokens, parma);
  mapping.registerTokens(getNodeTokens(name), parma, 'name');
  mapping.registerTokens(getNodeTokens(value ?? null), parma, 'value');
  mapping.registerTokens(getNodeTokens(length ?? null), parma, 'length');

  return {
    parma,
    filterNode: element,
    tokens: allTokens,
  };
}

export function findParmas(root: IntermediateFilter, mapping: TokenMapping): ParmasExtractionResult[] {
  const paths = findExpressions(
    root,
    (expr) => expr.nodeType === 'function_call' && identifierIs(expr.funcIdentifier, 'SYSTEM.PARMA')
  );

  return paths.map(([element, parentIfAny]) => extractParma(root, element, parentIfAny, mapping));
}
