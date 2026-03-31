import { DataFrame, FieldType } from '@grafana/data';

import { transformFrames } from './calculateCounterRateTransformer';

test('Calculate counter rate from increasing values', () => {
  const resultFrames = transformFrames(
    [
      {
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000],
          },
          {
            name: 'counter',
            config: { displayName: 'nice counter' },
            type: FieldType.number,
            values: [0, 1, 6, 78],
          },
        ],
        length: 40,
      },
    ],
    'counter',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        {
          name: 'time',
          config: { displayName: 'nice time' },
          type: FieldType.time,
          values: [0, 60000, 2 * 60000, 3 * 60000],
        },
        {
          name: 'counter',
          config: { displayName: 'nice counter' },
          type: FieldType.number,
          values: [0, 1, 6, 78],
        },
        {
          name: "Counter rate for 'nice counter'",
          config: { unit: '/min' },
          type: FieldType.number,
          values: [undefined, 1, 5, 72],
        },
      ],
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Calculate counter rate with decreasing value', () => {
  const resultFrames = transformFrames(
    [
      {
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000],
          },
          {
            name: 'counter',
            config: { displayName: 'nice counter' },
            type: FieldType.number,
            values: [0, 1, 6, 3],
          },
        ],
        length: 40,
      },
    ],
    'counter',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        {
          name: 'time',
          config: { displayName: 'nice time' },
          type: FieldType.time,
          values: [0, 60000, 2 * 60000, 3 * 60000],
        },
        {
          name: 'counter',
          config: { displayName: 'nice counter' },
          type: FieldType.number,
          values: [0, 1, 6, 3],
        },
        {
          name: "Counter rate for 'nice counter'",
          config: { unit: '/min' },
          type: FieldType.number,
          values: [undefined, 1, 5, 3],
        },
      ],
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Calculate counter rate with alphabetical string', () => {
  const resultFrames = transformFrames(
    [
      {
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
          },
          {
            name: 'counter',
            config: { displayName: 'nice counter' },
            type: FieldType.number,
            values: [0, 1, 'some string', 3, 6, 13],
          },
        ],
        length: 40,
      },
    ],
    'counter',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        {
          name: 'time',
          config: { displayName: 'nice time' },
          type: FieldType.time,
          values: [0, 60000, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
        },
        {
          name: 'counter',
          config: { displayName: 'nice counter' },
          type: FieldType.number,
          values: [0, 1, 'some string', 3, 6, 13],
        },
        {
          name: "Counter rate for 'nice counter'",
          config: { unit: '/min' },
          type: FieldType.number,
          values: [undefined, 1, undefined, undefined, 3, 7],
        },
      ],
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Calculate counter rate with negative number', () => {
  const resultFrames = transformFrames(
    [
      {
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
          },
          {
            name: 'counter',
            config: { displayName: 'nice counter' },
            type: FieldType.number,
            values: [0, 1, -255, 3, 6, 13],
          },
        ],
        length: 40,
      },
    ],
    'counter',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        {
          name: 'time',
          config: { displayName: 'nice time' },
          type: FieldType.time,
          values: [0, 60000, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
        },
        {
          name: 'counter',
          config: { displayName: 'nice counter' },
          type: FieldType.number,
          values: [0, 1, -255, 3, 6, 13],
        },
        {
          name: "Counter rate for 'nice counter'",
          config: { unit: '/min' },
          type: FieldType.number,
          values: [undefined, 1, undefined, undefined, 3, 7],
        },
      ],
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Calculate counter rate with undefined value', () => {
  const resultFrames = transformFrames(
    [
      {
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
          },
          {
            name: 'counter',
            config: { displayName: 'nice counter' },
            type: FieldType.number,
            values: [0, 1, undefined, 3, 6, 13],
          },
        ],
        length: 40,
      },
    ],
    'counter',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        {
          name: 'time',
          config: { displayName: 'nice time' },
          type: FieldType.time,
          values: [0, 60000, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
        },
        {
          name: 'counter',
          config: { displayName: 'nice counter' },
          type: FieldType.number,
          values: [0, 1, undefined, 3, 6, 13],
        },
        {
          name: "Counter rate for 'nice counter'",
          config: { unit: '/min' },
          type: FieldType.number,
          values: [undefined, 1, undefined, undefined, 3, 7],
        },
      ],
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Calculate counter rate with duplicate timestamp', () => {
  const resultFrames = transformFrames(
    [
      {
        name: 'duplicate timestamp',
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0, 0, 2 * 60000, 3 * 60000, 4 * 60000, 4 * 60000],
          },
          {
            name: 'counter',
            config: { displayName: 'nice counter' },
            type: FieldType.number,
            values: [0, 1, 2, 3, 6, 13],
          },
        ],
        length: 40,
      },
    ],
    'counter',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      name: 'duplicate timestamp',
      fields: [
        {
          name: 'time',
          config: { displayName: 'nice time' },
          type: FieldType.time,
          values: [0, 0, 2 * 60000, 3 * 60000, 4 * 60000, 4 * 60000],
        },
        {
          name: 'counter',
          config: { displayName: 'nice counter' },
          type: FieldType.number,
          values: [0, 1, 2, 3, 6, 13],
        },
      ],
      meta: {
        notices: [
          {
            severity: 'warning',
            text: "Calculate counter rate: invalid time column 'time' for frame 'duplicate timestamp': possible time duplication or time is not ordered.",
          },
        ],
      },
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});
test('Calculate counter rate with duplicate timestamp x2', () => {
  const resultFrames = transformFrames(
    [
      {
        name: 'duplicate timestamp',
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0, 0, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
          },
          {
            name: 'counter',
            config: { displayName: 'nice counter' },
            type: FieldType.number,
            values: [0, 1, 2, 3, 6, 13],
          },
        ],
        length: 40,
      },
    ],
    'counter',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      name: 'duplicate timestamp',
      fields: [
        {
          name: 'time',
          config: { displayName: 'nice time' },
          type: FieldType.time,
          values: [0, 0, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
        },
        {
          name: 'counter',
          config: { displayName: 'nice counter' },
          type: FieldType.number,
          values: [0, 1, 2, 3, 6, 13],
        },
      ],
      meta: {
        notices: [
          {
            severity: 'warning',
            text: "Calculate counter rate: invalid time column 'time' for frame 'duplicate timestamp': possible time duplication or time is not ordered.",
          },
        ],
      },
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Calculate counter rate and handle non existing time field', () => {
  const resultFrames = transformFrames(
    [
      {
        name: 'valid frame',
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000],
          },
          {
            name: 'counter',
            config: { displayName: 'nice counter' },
            type: FieldType.number,
            values: [0, 1, 6, 78],
          },
        ],
        length: 40,
      },
      {
        name: 'invalid frame',
        fields: [
          {
            name: 'counter',
            config: { displayName: 'nice counter' },
            type: FieldType.number,
            values: [0, 1, 6, 78],
          },
        ],
        length: 40,
      },
    ],
    'counter',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      name: 'valid frame',
      fields: [
        {
          name: 'time',
          config: { displayName: 'nice time' },
          type: FieldType.time,
          values: [0, 60000, 2 * 60000, 3 * 60000],
        },
        {
          name: 'counter',
          config: { displayName: 'nice counter' },
          type: FieldType.number,
          values: [0, 1, 6, 78],
        },
        {
          name: "Counter rate for 'nice counter'",
          config: { unit: '/min' },
          type: FieldType.number,
          values: [undefined, 1, 5, 72],
        },
      ],
      length: 40,
    },
    {
      name: 'invalid frame',
      fields: [
        {
          name: 'counter',
          config: { displayName: 'nice counter' },
          type: FieldType.number,
          values: [0, 1, 6, 78],
        },
      ],
      meta: {
        notices: [
          {
            severity: 'warning',
            text: "Calculate counter rate: time field 'time' not found in frame 'invalid frame'.",
          },
        ],
      },
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Handle non existing source column in frames', () => {
  const resultFrames = transformFrames(
    [
      {
        name: 'invalid frame',
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000],
          },
        ],
        length: 40,
      },
    ],
    'counter',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        {
          config: {
            displayName: 'nice time',
          },
          name: 'time',
          type: FieldType.time,
          values: [0, 60000, 120000, 180000],
        },
      ],
      length: 40,
      name: 'invalid frame',
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Calculate counter rate and handle non existing source column in frame', () => {
  const resultFrames = transformFrames(
    [
      {
        name: 'valid frame',
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000],
          },
          {
            name: 'counter',
            config: { displayName: 'nice counter' },
            type: FieldType.number,
            values: [0, 1, 6, 78],
          },
        ],
        length: 40,
      },
      {
        name: 'invalid frame',
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000],
          },
        ],
        length: 40,
      },
    ],
    'counter',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      name: 'valid frame',
      fields: [
        {
          name: 'time',
          config: { displayName: 'nice time' },
          type: FieldType.time,
          values: [0, 60000, 2 * 60000, 3 * 60000],
        },
        {
          name: 'counter',
          config: { displayName: 'nice counter' },
          type: FieldType.number,
          values: [0, 1, 6, 78],
        },
        {
          name: "Counter rate for 'nice counter'",
          config: { unit: '/min' },
          type: FieldType.number,
          values: [undefined, 1, 5, 72],
        },
      ],
      length: 40,
    },
    {
      name: 'invalid frame',
      fields: [
        {
          config: {
            displayName: 'nice time',
          },
          name: 'time',
          type: FieldType.time,
          values: [0, 60000, 120000, 180000],
        },
      ],
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Handle invalid source field type', () => {
  const resultFrames = transformFrames(
    [
      {
        name: 'invalid type test',
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000],
          },
          {
            name: 'also time',
            config: { displayName: 'nice time 2' },
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000],
          },
        ],
        length: 40,
      },
    ],
    'also time',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      name: 'invalid type test',
      fields: [
        {
          name: 'time',
          config: { displayName: 'nice time' },
          type: FieldType.time,
          values: [0, 60000, 2 * 60000, 3 * 60000],
        },
        {
          name: 'also time',
          config: { displayName: 'nice time 2' },
          type: FieldType.time,
          values: [0, 60000, 2 * 60000, 3 * 60000],
        },
      ],
      meta: {
        notices: [
          {
            severity: 'warning',
            text: "Calculate counter rate: invalid type 'time' for source field 'also time' in frame 'invalid type test', expected 'number'.",
          },
        ],
      },
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Handle single row data', () => {
  const resultFrames = transformFrames(
    [
      {
        name: 'single row',
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [0],
          },
          {
            name: 'counter',
            config: { displayName: 'nice counter' },
            type: FieldType.number,
            values: [10],
          },
        ],
        length: 1,
      },
    ],
    'counter',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      name: 'single row',
      fields: [
        {
          name: 'time',
          config: { displayName: 'nice time' },
          type: FieldType.time,
          values: [0],
        },
        {
          name: 'counter',
          config: { displayName: 'nice counter' },
          type: FieldType.number,
          values: [10],
        },
      ],
      meta: {
        notices: [
          {
            severity: 'warning',
            text: "Calculate counter rate: Data with only one record can not be used for 'Calculate counter rate' transformation.",
          },
        ],
      },
      length: 1,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Handle empty data', () => {
  const resultFrames = transformFrames(
    [
      {
        name: 'empty data',
        fields: [
          {
            name: 'time',
            config: { displayName: 'nice time' },
            type: FieldType.time,
            values: [],
          },
          {
            name: 'counter',
            config: { displayName: 'nice counter' },
            type: FieldType.number,
            values: [],
          },
        ],
        length: 0,
      },
    ],
    'counter',
    'time'
  );
  const expectedFrames: DataFrame[] = [
    {
      name: 'empty data',
      fields: [
        {
          name: 'time',
          config: { displayName: 'nice time' },
          type: FieldType.time,
          values: [],
        },
        {
          name: 'counter',
          config: { displayName: 'nice counter' },
          type: FieldType.number,
          values: [],
        },
      ],
      length: 0,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});
