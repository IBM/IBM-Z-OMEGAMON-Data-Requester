// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

import { AstNode } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/parser';

export class ConverterError extends Error {
  constructor(
    message: string,
    public affectedNodes: AstNode[]
  ) {
    super(message);
  }
}
