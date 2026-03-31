import { FilterCombinationResult } from 'public-common';

import { MetricsQueryFilter, MetricsQueryFilterClause } from 'datasource/domain';

type TransformFilterTest = {
  [key: string]: {
    input: MetricsQueryFilter;
    expectedResult: FilterCombinationResult<MetricsQueryFilterClause>;
  };
};

export const TRANSFORM_FILTER_TEST_DATA: TransformFilterTest = {
  'Single Clause': {
    input: {
      clause: {
        columnId: 'AFFINITIES',
        operator: '=',
        userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
      },
    },
    expectedResult: {
      clause: {
        columnId: 'AFFINITIES',
        operator: '=',
        userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
      },
    },
  },
  'Simple OR': {
    input: {
      or: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
      ],
    },
    expectedResult: {
      or: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
      ],
    },
  },
  'Nested OR with 2 clauses each': {
    input: {
      or: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
        {
          or: [
            {
              clause: {
                columnId: 'AFFINITIES',
                operator: '=',
                userDefinedValue: '2',
              },
            },
            {
              clause: {
                columnId: 'AFFINITIES',
                operator: '=',
                userDefinedValue: '3',
              },
            },
          ],
        },
      ],
    },
    expectedResult: {
      or: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
      ],
    },
  },
  'Simplify nested OR': {
    input: {
      or: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
        {
          or: [
            {
              clause: {
                columnId: 'AFFINITIES',
                operator: '=',
                userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
              },
            },
            {
              clause: {
                columnId: 'AFFINITIES',
                operator: '=',
                userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
              },
            },
            {
              or: [
                {
                  clause: {
                    columnId: 'AFFINITIES',
                    operator: '=',
                    userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
                  },
                },
                {
                  clause: {
                    columnId: 'AFFINITIES',
                    operator: '=',
                    userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    expectedResult: {
      or: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
      ],
    },
  },
  'Simple AND': {
    input: {
      and: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
      ],
    },
    expectedResult: {
      and: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
      ],
    },
  },
  'Nested AND with 2 clauses each': {
    input: {
      and: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
        {
          and: [
            {
              clause: {
                columnId: 'AFFINITIES',
                operator: '=',
                userDefinedValue: '2',
              },
            },
            {
              clause: {
                columnId: 'AFFINITIES',
                operator: '=',
                userDefinedValue: '3',
              },
            },
          ],
        },
      ],
    },
    expectedResult: {
      and: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
      ],
    },
  },
  'Simplify nested AND': {
    input: {
      and: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
        {
          and: [
            {
              clause: {
                columnId: 'AFFINITIES',
                operator: '=',
                userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
              },
            },
            {
              clause: {
                columnId: 'AFFINITIES',
                operator: '=',
                userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
              },
            },
            {
              and: [
                {
                  clause: {
                    columnId: 'AFFINITIES',
                    operator: '=',
                    userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
                  },
                },
                {
                  clause: {
                    columnId: 'AFFINITIES',
                    operator: '=',
                    userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    expectedResult: {
      and: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
      ],
    },
  },
  'A AND (B OR C)': {
    input: {
      and: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '1' } },
        {
          or: [
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
          ],
        },
      ],
    },
    expectedResult: {
      and: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '1' } },
        {
          or: [
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
          ],
        },
      ],
    },
  },
  'A OR (B AND C)': {
    input: {
      or: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '1' } },
        {
          and: [
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
          ],
        },
      ],
    },
    expectedResult: {
      or: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '1' } },
        {
          and: [
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
          ],
        },
      ],
    },
  },
  always_true: {
    input: {
      clause: {
        columnId: 'AFFINITIES',
        operator: '=',
        userDefinedValue: 'REPLACE_WITH_ALWAYS_TRUE',
      },
    },
    expectedResult: 'always_true',
  },
  'always_true AND B': {
    input: {
      and: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_ALWAYS_TRUE',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
      ],
    },
    expectedResult: {
      clause: {
        columnId: 'AFFINITIES',
        operator: '=',
        userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
      },
    },
  },
  'always_true AND B AND C': {
    input: {
      and: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_ALWAYS_TRUE',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
      ],
    },
    expectedResult: {
      and: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
      ],
    },
  },
  'always_true OR B': {
    input: {
      or: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_ALWAYS_TRUE',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
      ],
    },
    expectedResult: 'always_true',
  },
  'always_true OR B OR C': {
    input: {
      or: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_ALWAYS_TRUE',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
      ],
    },
    expectedResult: 'always_true',
  },
  'A OR no_filter': {
    input: {
      or: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_NO_FILTER',
          },
        },
      ],
    },
    expectedResult: {
      clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' },
    },
  },
  'A OR B OR no_filter': {
    input: {
      or: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_NO_FILTER',
          },
        },
      ],
    },
    expectedResult: {
      or: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
      ],
    },
  },
  'A AND B AND no_filter': {
    input: {
      and: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_NO_FILTER',
          },
        },
      ],
    },
    expectedResult: {
      and: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
      ],
    },
  },
  'A AND no_filter': {
    input: {
      and: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_NO_FILTER',
          },
        },
      ],
    },
    expectedResult: {
      clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' },
    },
  },
  'always_true AND no_filter': {
    input: {
      and: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_ALWAYS_TRUE',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_NO_FILTER',
          },
        },
      ],
    },
    expectedResult: 'always_true',
  },
  'always_true OR no_filter clause': {
    input: {
      or: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_ALWAYS_TRUE',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_NO_FILTER',
          },
        },
      ],
    },
    expectedResult: 'always_true',
  },
  'no_filter AND (B OR C)': {
    input: {
      and: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: 'REPLACE_WITH_NO_FILTER' } },
        {
          or: [
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
          ],
        },
      ],
    },
    expectedResult: {
      or: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
      ],
    },
  },
  'A AND (no_filter OR C)': {
    input: {
      and: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '1' } },
        {
          or: [
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: 'REPLACE_WITH_NO_FILTER' } },
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
          ],
        },
      ],
    },
    expectedResult: {
      and: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '1' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
      ],
    },
  },
  'no_filter OR (B AND C)': {
    input: {
      or: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: 'REPLACE_WITH_NO_FILTER' } },
        {
          and: [
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
          ],
        },
      ],
    },
    expectedResult: {
      and: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
      ],
    },
  },
  'A OR (B AND no_filter)': {
    input: {
      or: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '1' } },
        {
          and: [
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: 'REPLACE_WITH_NO_FILTER' } },
          ],
        },
      ],
    },
    expectedResult: {
      or: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '1' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
      ],
    },
  },
  'A OR always_false': {
    input: {
      or: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_ALWAYS_FALSE',
          },
        },
      ],
    },
    expectedResult: {
      clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' },
    },
  },
  'A AND always_false': {
    input: {
      and: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_ALWAYS_FALSE',
          },
        },
      ],
    },
    expectedResult: 'always_false',
  },
  'A OR always_false OR B ': {
    input: {
      or: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_ALWAYS_FALSE',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
      ],
    },
    expectedResult: {
      or: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA043' } },
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '%IBM.CICSplex 00000000050000yA022' } },
      ],
    },
  },
  'A AND B AND always_false': {
    input: {
      and: [
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA043',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: '%IBM.CICSplex 00000000050000yA022',
          },
        },
        {
          clause: {
            columnId: 'AFFINITIES',
            operator: '=',
            userDefinedValue: 'REPLACE_WITH_ALWAYS_FALSE',
          },
        },
      ],
    },
    expectedResult: 'always_false',
  },
  'always_false AND (B OR C)': {
    input: {
      and: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: 'REPLACE_WITH_ALWAYS_FALSE' } },
        {
          or: [
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '3' } },
          ],
        },
      ],
    },
    expectedResult: 'always_false',
  },
  'A OR (B AND always_false)': {
    input: {
      or: [
        { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '1' } },
        {
          and: [
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '2' } },
            { clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: 'REPLACE_WITH_ALWAYS_FALSE' } },
          ],
        },
      ],
    },
    expectedResult: {
      clause: { columnId: 'AFFINITIES', operator: '=', userDefinedValue: '1' },
    },
  },
};
