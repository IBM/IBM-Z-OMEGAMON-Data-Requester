import { queries } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery';
import { tokenize } from 'datasource/features/cmsSqlTransformers/cmsSqlToMetricsQuery/tokenizer';

import { parseSelectStatement } from './parseSelectStatement';

queries.forEach((_queryStr) => {
  test(_queryStr, () => {
    const { statement, problems } = parseSelectStatement(tokenize(_queryStr));
    expect({
      _query: _queryStr,
      statement,
      problems,
    }).toMatchSnapshot();
    return;
  });
});
