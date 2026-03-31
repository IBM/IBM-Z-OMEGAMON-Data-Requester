import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { AstNode, Identifier, Expression } from './AstNode';

export function getNodesTokens(nodes: AstNode[]): Token[] {
  return nodes.map(getNodeTokens).flat();
}

export function getNodeTokens(node: AstNode | null): Token[] {
  if (!node) {
    return [];
  }
  switch (node.nodeType) {
    case 'value':
      return node.tokens;
    case 'qualified_identifier':
      return [node.left, node.right];
    case 'unqualified_identifier':
      return [node.token];
    case 'binary':
      return [...getNodeTokens(node.left), node.operator, ...getNodeTokens(node.right)];
    case 'unary':
      return [node.operator, ...getNodeTokens(node.childExpr)];
    case 'function_call':
      return [
        ...getNodeTokens(node.funcIdentifier),
        node.openParenthesis,
        ...getNodesTokens(node.args),
        node.closeParenthesis,
      ];
    case 'select':
      return [node.keyword, ...getNodesTokens(node.items)];
    case 'from':
      return [node.keyword, ...getNodesTokens(node.tables)];
    case 'at':
      return [node.keyword, ...getNodesTokens(node.items)];
    case 'history':
      return [node.keyword];
    case 'where':
    case 'having':
      return [node.keyword, ...getNodeTokens(node.filter)];
    case 'group_by':
      return [...node.keywords, ...getNodesTokens(node.columns)];
    case 'order_by':
      return [...node.keywords, ...getNodesTokens(node.items)];
    case 'order_by_expression':
      return node.direction ? [...getNodeTokens(node.identifier), node.direction] : [...getNodeTokens(node.identifier)];
    case 'select_statement':
      return [
        ...getNodeTokens(node.select),
        ...getNodeTokens(node.from),
        ...getNodeTokens(node.at),
        ...getNodeTokens(node.history),
        ...getNodeTokens(node.where),
        ...getNodeTokens(node.groupBy),
        ...getNodeTokens(node.having),
        ...getNodeTokens(node.orderBy),
      ];
  }
}

export function getFullIdentifierName(identifier: Identifier): string {
  if (identifier.nodeType === 'qualified_identifier') {
    return `${identifier.left.tokenText}.${identifier.right.tokenText}`.toUpperCase();
  }
  return identifier.token.tokenText.toUpperCase();
}

export function exprIsIdentifier(expr: Expression): expr is Identifier {
  return expr.nodeType === 'qualified_identifier' || expr.nodeType === 'unqualified_identifier';
}

export function identifierIs(identifier: Identifier, expected: string): boolean {
  return getFullIdentifierName(identifier) === expected.toUpperCase();
}

export function identifierIsColumnId(identifier: Identifier, columnId: string): boolean {
  return getAsColumnId(identifier) === columnId.toUpperCase();
}

export function getAsColumnId(identifier: Identifier): string {
  if (identifier.nodeType === 'unqualified_identifier') {
    return identifier.token.tokenText.toUpperCase();
  }
  return identifier.right.tokenText.toUpperCase();
}
