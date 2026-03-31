import { Filter } from 'types';

import { extractFilterClauses } from './extractFilterClauses';

type SomeClause = {
  a: number;
  b: string;
};

const filter = {
  and: [
    {
      or: [
        {
          clause: {
            a: 111,
            b: 'bla1',
          },
        },
        {
          clause: {
            a: 222,
            b: 'bla2',
          },
        },
      ],
    },
    {
      clause: {
        a: 333,
        b: 'bla3',
      },
    },
  ],
} as Filter<SomeClause>;

describe(extractFilterClauses.name, () => {
  it('extracts clause array from filter', () => {
    expect(extractFilterClauses(filter)).toEqual([
      {
        a: 111,
        b: 'bla1',
      },
      {
        a: 222,
        b: 'bla2',
      },
      {
        a: 333,
        b: 'bla3',
      },
    ]);
  });
});
