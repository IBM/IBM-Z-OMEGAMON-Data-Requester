import { resolveAutomaticIntervalMinutes } from './timeSeriesInterval';

const MIN = 1; // 1 minute

describe(resolveAutomaticIntervalMinutes.name, () => {
  describe('minimum interval enforcement', () => {
    test('clamps zero to 1 minute', () => {
      expect(resolveAutomaticIntervalMinutes(0)).toBe(MIN);
    });

    test('clamps sub-minute intervals to 1 minute', () => {
      expect(resolveAutomaticIntervalMinutes(30_000)).toBe(MIN); // 30 s
      expect(resolveAutomaticIntervalMinutes(59_999)).toBe(MIN); // just under 1 min
    });

    test('does not clamp intervals at or above 1 minute', () => {
      expect(resolveAutomaticIntervalMinutes(60_000)).toBe(MIN);
      expect(resolveAutomaticIntervalMinutes(120_000)).toBe(MIN * 2);
    });
  });

  describe('rounds to nearest whole minute', () => {
    test('passes through already-whole-minute intervals unchanged', () => {
      expect(resolveAutomaticIntervalMinutes(60_000)).toBe(1); // 1 min
      expect(resolveAutomaticIntervalMinutes(900_000)).toBe(15); // 15 min
      expect(resolveAutomaticIntervalMinutes(3_600_000)).toBe(60); // 60 min
      expect(resolveAutomaticIntervalMinutes(86_400_000)).toBe(1_440); // 1440 min
    });

    test('rounds fractional minutes down when below .5', () => {
      expect(resolveAutomaticIntervalMinutes(84_000)).toBe(1); // 1.4 min → 1 min
      expect(resolveAutomaticIntervalMinutes(63_241)).toBe(1); // ~1.05 min → 1 min
      expect(resolveAutomaticIntervalMinutes(3_342_000)).toBe(56); // 55.7 min → 56 min
    });

    test('rounds fractional minutes up when at or above .5', () => {
      expect(resolveAutomaticIntervalMinutes(90_000)).toBe(2); // 1.5 min → 2 min
      expect(resolveAutomaticIntervalMinutes(3_390_000)).toBe(57); // 56.5 min → 57 min
    });

    test('does not snap to pre-aggregated buckets — near-1h and near-1d intervals round naturally', () => {
      expect(resolveAutomaticIntervalMinutes(3_240_000)).toBe(54); // 54 min stays 54 min
      expect(resolveAutomaticIntervalMinutes(3_300_000)).toBe(55); // 55 min stays 55 min
      expect(resolveAutomaticIntervalMinutes(3_960_000)).toBe(66); // 66 min stays 66 min
      expect(resolveAutomaticIntervalMinutes(77_760_000)).toBe(1_296); // 1296 min stays 1296 min
    });
  });
});
