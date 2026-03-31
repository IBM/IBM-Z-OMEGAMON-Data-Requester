import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

export interface ValidationProblem {
  severity: 'warning' | 'error';
  message: string;
  affectedTokens?: Token[];
}

export const inappropriateWritetimeColumnMessage =
  '"WRITETIME" column can only be used in historical queries but no "HISTORY()" call found in query';
