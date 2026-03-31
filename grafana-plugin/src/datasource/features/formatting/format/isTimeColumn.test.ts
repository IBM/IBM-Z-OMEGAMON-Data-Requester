import { isTimeColumn } from './isTimeColumn';

describe(isTimeColumn.name, () => {
  test('only column type is passed', () => {
    expect(isTimeColumn('timestamp')).toEqual(true);
    expect(isTimeColumn('itmTimestamp')).toEqual(true);
    expect(isTimeColumn('something')).toEqual(false);
  });
  test('both parameters are passed', () => {
    expect(isTimeColumn('timestamp', '2025-09-16T07:51:31.782-04:00')).toEqual(true);
    expect(isTimeColumn('itmTimestamp', '2025-09-16T07:51:31.782-04:00')).toEqual(true);
    expect(isTimeColumn('something', '2025-09-16T07:51:31.782-04:00')).toEqual(true);

    expect(isTimeColumn('timestamp', '2025-09-16 07:51:31')).toEqual(true);
    expect(isTimeColumn('itmTimestamp', '2025-09-16 07:51:31')).toEqual(true);
    expect(isTimeColumn('something', '2025-09-16 07:51:31')).toEqual(false);
  });
  test('all should be false', () => {
    expect(isTimeColumn('something', '2025-09-16')).toEqual(false);
    expect(isTimeColumn('something', '07:51:31')).toEqual(false);
    expect(isTimeColumn('something', '2025-091607:51:31')).toEqual(false);
    expect(isTimeColumn('something', '2025 07:51:31')).toEqual(false);
    expect(isTimeColumn('something', 'something')).toEqual(false);
  });
  test('all milliseconds cases', () => {
    expect(isTimeColumn('something', '2025-09-16T07:51:31.782-04:00')).toEqual(true);
    expect(isTimeColumn('something', '2025-09-16T07:51:31.72-04:00')).toEqual(true);
    expect(isTimeColumn('something', '2025-09-16T07:51:31.2-04:00')).toEqual(true);
    expect(isTimeColumn('something', '2025-09-16T07:51:31-04:00')).toEqual(true);
  });
  test('all time zones', () => {
    expect(isTimeColumn('something', '2025-09-16T07:51:31.782+04:00')).toEqual(true);
    expect(isTimeColumn('something', '2025-09-16T07:51:31.782-04:00')).toEqual(true);
  });
});
