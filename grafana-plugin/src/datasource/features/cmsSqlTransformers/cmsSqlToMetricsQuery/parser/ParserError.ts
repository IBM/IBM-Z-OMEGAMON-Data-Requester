import { Token } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

export class ParserError extends Error {
  constructor(
    message: string,
    public tokens: Token[]
  ) {
    super(message);
  }
}
