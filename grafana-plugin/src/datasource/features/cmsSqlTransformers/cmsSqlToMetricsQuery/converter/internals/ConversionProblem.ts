import { AstNode } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';
import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

type ConversionProblemTokenLink =
  | {
      affectedAstNodes: AstNode[];
    }
  | {
      affectedTokens: Token[];
    };

export type ConversionProblem = {
  message: string;
  severity: 'error' | 'warning' | 'informational';
} & ConversionProblemTokenLink;
