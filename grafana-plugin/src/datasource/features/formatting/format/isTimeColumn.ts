export function isTimeColumn(columnType: string, value?: string): boolean {
  if (columnType === 'timestamp' || columnType === 'itmTimestamp') {
    return true;
  }
  if (value) {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
    return iso8601Regex.test(value);
  }

  return false;
}
