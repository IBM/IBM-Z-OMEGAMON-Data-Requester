import {
  TokenOf,
  TokenOfGenericKind,
  Value,
} from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

export interface UnaryExpression {
  nodeType: 'unary';
  operator: TokenOf<'add_arithmetic_operator' | 'sub_arithmetic_operator'>;
  childExpr: Expression;
}

export interface BinaryExpression {
  nodeType: 'binary';
  left: Expression;
  right: Expression;
  operator: TokenOfGenericKind<'arithmetic_operator' | 'comparison_operator' | 'condition_connector'>;
}

export interface UnqualifiedIdentifier {
  nodeType: 'unqualified_identifier';
  token: TokenOf<'identifier'>;
}

export interface QualifiedIdentifier {
  nodeType: 'qualified_identifier';
  left: TokenOf<'identifier'>;
  right: TokenOf<'identifier'>;
}

export interface ValueExpression<T extends Value = Value> {
  nodeType: 'value';
  tokens: T[];
  asUserDefinedValue: string | number;
}

export type Identifier = UnqualifiedIdentifier | QualifiedIdentifier;

export interface FunctionCall {
  nodeType: 'function_call';
  funcIdentifier: Identifier;
  openParenthesis: TokenOf<'open_parenthesis'>;
  closeParenthesis: TokenOf<'close_parenthesis'>;
  args: Expression[];
}

export type Expression = ValueExpression | UnaryExpression | BinaryExpression | FunctionCall | Identifier;

export type SelectItem = Identifier | FunctionCall;

export type SelectClause = {
  nodeType: 'select';
  items: SelectItem[];
  keyword: TokenOf<'select_keyword'>;
};

export type FromClause = {
  nodeType: 'from';
  tables: Identifier[];
  keyword: TokenOf<'from_keyword'>;
};

export type AtClause = {
  nodeType: 'at';
  items: Expression[];
  keyword: TokenOf<'at_keyword'>;
};

export type HistoryClause = {
  nodeType: 'history';
  keyword: TokenOf<'history_keyword'>;
};

export type WhereClause = {
  nodeType: 'where';
  filter: Expression;
  keyword: TokenOf<'where_keyword'>;
};

export type HavingClause = {
  nodeType: 'having';
  filter: Expression;
  keyword: TokenOf<'having_keyword'>;
};

export type GroupByClause = {
  nodeType: 'group_by';
  columns: Identifier[];
  keywords: [TokenOf<'group_keyword'>, TokenOf<'by_keyword'>];
};

export type OrderByExpression = {
  nodeType: 'order_by_expression';
  identifier: Identifier;
  direction: TokenOfGenericKind<'order_direction'> | null;
};

export type OrderByClause = {
  nodeType: 'order_by';
  items: OrderByExpression[];
  keywords: [TokenOf<'order_keyword'>, TokenOf<'by_keyword'>];
};

export type SelectStatement = {
  nodeType: 'select_statement';
  select: SelectClause;
  from: FromClause;
  at: AtClause | null;
  history: HistoryClause | null;
  where: WhereClause | null;
  groupBy: GroupByClause | null;
  having: HavingClause | null;
  orderBy: OrderByClause | null;
};

export type AstNode =
  | Expression
  | SelectClause
  | FromClause
  | AtClause
  | HistoryClause
  | WhereClause
  | GroupByClause
  | HavingClause
  | OrderByExpression
  | OrderByClause
  | SelectStatement;
