/** Minimum supported aggregation interval: 1 minute */
const MIN_AGGREGATION_INTERVAL_MINUTES = 1;

/**
 * Resolves the aggregation interval (minutes) for `AUTOMATIC` mode:
 * clamps `grafanaIntervalMs` to the minimum supported value (1 min),
 * then rounds to the nearest whole minute.
 */
export function resolveAutomaticIntervalMinutes(grafanaIntervalMs: number): number {
  const intervalMinutes = grafanaIntervalMs / 60_000;
  return Math.max(Math.round(intervalMinutes), MIN_AGGREGATION_INTERVAL_MINUTES);
}
