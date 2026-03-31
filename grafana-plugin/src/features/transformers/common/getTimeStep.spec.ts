import { FieldType } from '@grafana/data';

import { getMinTimeStep } from './field';

test('Get min times step', () => {
  const timeStep = getMinTimeStep({
    name: 'time',
    config: { displayName: 'nice time' },
    type: FieldType.time,
    values: [0, 60000, 2 * 60000, 3 * 60000],
  });
  expect(timeStep).toEqual(60000);
});

test('Get min times step x2', () => {
  const timeStep = getMinTimeStep({
    name: 'time',
    config: { displayName: 'nice time' },
    type: FieldType.time,
    values: [0, 0, 2 * 60000, 3 * 60000],
  });
  expect(timeStep).toEqual(0);
});

test('Get min times step x3', () => {
  const timeStep = getMinTimeStep({
    name: 'time',
    config: { displayName: 'nice time' },
    type: FieldType.time,
    values: [0, 60000, 2 * 60000, 3 * 60000, 3 * 60000],
  });
  expect(timeStep).toEqual(0);
});
