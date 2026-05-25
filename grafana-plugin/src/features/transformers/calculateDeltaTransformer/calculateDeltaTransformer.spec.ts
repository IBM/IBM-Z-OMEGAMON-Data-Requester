import { DataFrame, FieldType } from '@grafana/data';

import { transformFrames } from './calculateDeltaTransformer';

test('Calculate delta from increasing values', () => {
  const resultFrames = transformFrames(
    [
      {
        fields: [
          { name: 'time', config: {}, type: FieldType.time, values: [0, 60000, 2 * 60000, 3 * 60000] },
          { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [0, 1, 6, 78] },
        ],
        length: 40,
      },
    ],
    'delta'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        { name: 'time', config: {}, type: FieldType.time, values: [0, 60000, 2 * 60000, 3 * 60000] },
        { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [0, 1, 6, 78] },
        {
          name: "Difference of 'nice delta'",
          config: {},
          type: FieldType.number,
          values: [undefined, 1, 5, 72],
        },
      ],
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Calculate delta with decreasing value', () => {
  const resultFrames = transformFrames(
    [
      {
        fields: [
          { name: 'time', config: {}, type: FieldType.time, values: [0, 60000, 2 * 60000, 3 * 60000] },
          { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [0, 1, 6, 3] },
        ],
        length: 40,
      },
    ],
    'delta'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        { name: 'time', config: {}, type: FieldType.time, values: [0, 60000, 2 * 60000, 3 * 60000] },
        { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [0, 1, 6, 3] },
        {
          name: "Difference of 'nice delta'",
          config: {},
          type: FieldType.number,
          values: [undefined, 1, 5, 0],
        },
      ],
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Calculate delta with alphabetical string', () => {
  const resultFrames = transformFrames(
    [
      {
        fields: [
          {
            name: 'time',
            config: {},
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
          },
          {
            name: 'delta',
            config: { displayName: 'nice delta' },
            type: FieldType.number,
            values: [0, 1, 'some string', 3, 6, 13],
          },
        ],
        length: 40,
      },
    ],
    'delta'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        {
          name: 'time',
          config: {},
          type: FieldType.time,
          values: [0, 60000, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
        },
        {
          name: 'delta',
          config: { displayName: 'nice delta' },
          type: FieldType.number,
          values: [0, 1, 'some string', 3, 6, 13],
        },
        {
          name: "Difference of 'nice delta'",
          config: {},
          type: FieldType.number,
          values: [undefined, 1, undefined, undefined, 3, 7],
        },
      ],
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Calculate delta with negative number', () => {
  const resultFrames = transformFrames(
    [
      {
        fields: [
          {
            name: 'time',
            config: {},
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
          },
          {
            name: 'delta',
            config: { displayName: 'nice delta' },
            type: FieldType.number,
            values: [0, 1, -255, 3, 6, 13],
          },
        ],
        length: 40,
      },
    ],
    'delta'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        {
          name: 'time',
          config: {},
          type: FieldType.time,
          values: [0, 60000, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
        },
        {
          name: 'delta',
          config: { displayName: 'nice delta' },
          type: FieldType.number,
          values: [0, 1, -255, 3, 6, 13],
        },
        {
          name: "Difference of 'nice delta'",
          config: {},
          type: FieldType.number,
          values: [undefined, 1, undefined, undefined, 3, 7],
        },
      ],
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Calculate delta with undefined value', () => {
  const resultFrames = transformFrames(
    [
      {
        fields: [
          {
            name: 'time',
            config: {},
            type: FieldType.time,
            values: [0, 60000, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
          },
          {
            name: 'delta',
            config: { displayName: 'nice delta' },
            type: FieldType.number,
            values: [0, 1, undefined, 3, 6, 13],
          },
        ],
        length: 40,
      },
    ],
    'delta'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        {
          name: 'time',
          config: {},
          type: FieldType.time,
          values: [0, 60000, 2 * 60000, 3 * 60000, 4 * 60000, 5 * 60000],
        },
        {
          name: 'delta',
          config: { displayName: 'nice delta' },
          type: FieldType.number,
          values: [0, 1, undefined, 3, 6, 13],
        },
        {
          name: "Difference of 'nice delta'",
          config: {},
          type: FieldType.number,
          values: [undefined, 1, undefined, undefined, 3, 7],
        },
      ],
      length: 40,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Handle frames without sourceField', () => {
  const resultFrames = transformFrames(
    [
      {
        fields: [
          { name: 'time', config: {}, type: FieldType.time, values: [0, 60000, 2 * 60000, 3 * 60000] },
          { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [0, 1, 6, 78] },
        ],
        length: 40,
      },
      {
        fields: [{ name: 'time', config: {}, type: FieldType.time, values: [0, 60000, 2 * 60000, 3 * 60000] }],
        length: 40,
      },
    ],
    'delta'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        { name: 'time', config: {}, type: FieldType.time, values: [0, 60000, 2 * 60000, 3 * 60000] },
        { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [0, 1, 6, 78] },
        {
          name: "Difference of 'nice delta'",
          config: {},
          type: FieldType.number,
          values: [undefined, 1, 5, 72],
        },
      ],
      length: 40,
    },
    {
      fields: [{ name: 'time', config: {}, type: FieldType.time, values: [0, 60000, 2 * 60000, 3 * 60000] }],
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
          { name: 'time', config: {}, type: FieldType.time, values: [0] },
          { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [10] },
        ],
        length: 1,
      },
    ],
    'delta'
  );
  const expectedFrames: DataFrame[] = [
    {
      name: 'single row',
      fields: [
        { name: 'time', config: {}, type: FieldType.time, values: [0] },
        { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [10] },
      ],
      meta: {
        notices: [
          {
            severity: 'warning',
            text: "Calculate delta: Data with only one record can not be used for 'Calculate delta' transformation.",
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
        fields: [
          { name: 'time', config: {}, type: FieldType.time, values: [] },
          { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [] },
        ],
        length: 0,
      },
    ],
    'delta'
  );
  const expectedFrames: DataFrame[] = [
    {
      fields: [
        { name: 'time', config: {}, type: FieldType.time, values: [] },
        { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [] },
      ],
      length: 0,
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
          { name: 'time', config: {}, type: FieldType.time, values: [0, 60000, 2 * 60000, 3 * 60000] },
          {
            name: 'text_field',
            config: { displayName: 'text field' },
            type: FieldType.string,
            values: ['a', 'b', 'c', 'd'],
          },
        ],
        length: 4,
      },
    ],
    'text_field'
  );
  const expectedFrames: DataFrame[] = [
    {
      name: 'invalid type test',
      fields: [
        { name: 'time', config: {}, type: FieldType.time, values: [0, 60000, 2 * 60000, 3 * 60000] },
        {
          name: 'text_field',
          config: { displayName: 'text field' },
          type: FieldType.string,
          values: ['a', 'b', 'c', 'd'],
        },
      ],
      meta: {
        notices: [
          {
            severity: 'warning',
            text: "Calculate delta: invalid type 'string' for source field 'text_field' in frame 'invalid type test', expected 'number'.",
          },
        ],
      },
      length: 4,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Handle invalid time step', () => {
  const resultFrames = transformFrames(
    [
      {
        name: 'duplicate timestamp',
        fields: [
          { name: 'time', config: {}, type: FieldType.time, values: [0, 0, 2 * 60000, 3 * 60000] },
          { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [0, 1, 6, 78] },
        ],
        length: 4,
      },
    ],
    'delta'
  );
  const expectedFrames: DataFrame[] = [
    {
      name: 'duplicate timestamp',
      fields: [
        { name: 'time', config: {}, type: FieldType.time, values: [0, 0, 2 * 60000, 3 * 60000] },
        { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [0, 1, 6, 78] },
      ],
      meta: {
        notices: [
          {
            severity: 'warning',
            text: "Calculate delta: no time field with valid time step found in frame 'duplicate timestamp'.",
          },
        ],
      },
      length: 4,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});

test('Handle frame without time fields', () => {
  const resultFrames = transformFrames(
    [
      {
        name: 'no time field',
        fields: [
          { name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [0, 1, 6, 78] },
        ],
        length: 4,
      },
    ],
    'delta'
  );
  const expectedFrames: DataFrame[] = [
    {
      name: 'no time field',
      fields: [{ name: 'delta', config: { displayName: 'nice delta' }, type: FieldType.number, values: [0, 1, 6, 78] }],
      meta: {
        notices: [
          {
            severity: 'warning',
            text: "Calculate delta: no time field with valid time step found in frame 'no time field'.",
          },
        ],
      },
      length: 4,
    },
  ];
  expect(resultFrames).toEqual(expectedFrames);
});
