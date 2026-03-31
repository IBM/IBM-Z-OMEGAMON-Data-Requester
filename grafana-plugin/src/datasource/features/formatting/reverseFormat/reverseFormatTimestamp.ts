function formatTimeUnit(timeUnitAsNumber: number, minimalRequiredLength = 2): string {
  const timeUnitAsFormattedString = timeUnitAsNumber.toString().padStart(minimalRequiredLength, '0');
  return timeUnitAsFormattedString;
}

/**
 * Converts JS Date object into ITM timestamp
 * @param date
 * @returns ITM timestamp
 */
export function reverseFormatTimestamp(date: Date): string {
  const century = Math.floor(date.getFullYear() / 100) - 19;
  const year = date.getFullYear().toString().slice(2, 4);
  const month = formatTimeUnit(date.getMonth() + 1);
  const day = formatTimeUnit(date.getUTCDate());
  const hour = formatTimeUnit(date.getHours());
  const minutes = formatTimeUnit(date.getMinutes());
  const seconds = formatTimeUnit(date.getSeconds());
  const milliseconds = formatTimeUnit(date.getMilliseconds(), 3);
  const itmTimestamp = century + year + month + day + hour + minutes + seconds + milliseconds;
  return itmTimestamp;
}
