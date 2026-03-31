import { FilterCombinationResult } from 'public-common';

import { MetricsQueryFilterClause, MetricsQueryFilter } from 'datasource/domain';

import { TRANSFORM_FILTER_TEST_DATA } from './mocks';
import { transformClauses } from './transformFilter';

const simpleTransformer = (clause: MetricsQueryFilterClause): FilterCombinationResult<MetricsQueryFilterClause> => {
  switch (clause.userDefinedValue) {
    case 'REPLACE_WITH_ALWAYS_TRUE':
      return 'always_true';
    case 'REPLACE_WITH_NO_FILTER':
      return 'no_filter';
    case 'REPLACE_WITH_ALWAYS_FALSE':
      return 'always_false';
    default:
      return { clause };
  }
};

for (const testName in TRANSFORM_FILTER_TEST_DATA) {
  test(testName, async () => {
    const filter = transformClauses(
      TRANSFORM_FILTER_TEST_DATA[testName]?.input as MetricsQueryFilter,
      simpleTransformer
    );
    expect(filter).toEqual(TRANSFORM_FILTER_TEST_DATA[testName]?.expectedResult);
  });
}
