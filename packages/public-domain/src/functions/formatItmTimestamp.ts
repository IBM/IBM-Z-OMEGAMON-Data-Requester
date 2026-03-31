const INVALID_TIMESTAMP = new Date(NaN);

const ITM_TIMESTAMP_FORMAT = 'CYYMMDDhhmmss000';
const ITM_TIMESTAMP_LENGTH = ITM_TIMESTAMP_FORMAT.length;

function validateItmTimestamp(itmTimestamp: string): boolean {
  const hasOnlyDigits = /^\d+$/.test(itmTimestamp);
  const isValidLength = itmTimestamp.length === ITM_TIMESTAMP_LENGTH;

  return (
    hasOnlyDigits &&
    isValidLength &&
    /**
     * See features/format/README.md
     */
    itmTimestamp !== '0000000000000000'
  );
}

/**
 * Caution! This function treats itmTimestamp as if it
 * defined time in the same time zone, where the code is running.
 * In some cases that does not matter,
 * but in other cases it might lead to bugs.
 */
function itmTimestampToUnixTimestamp(itmTimestamp: string): Date {
  const century = Number(itmTimestamp[0]) + 19;
  const year = Number(itmTimestamp.substring(1, 3));
  const month = Number(itmTimestamp.substring(3, 5)) - 1;
  const day = Number(itmTimestamp.substring(5, 7));
  const hour = Number(itmTimestamp.substring(7, 9));
  const minute = Number(itmTimestamp.substring(9, 11));
  const second = Number(itmTimestamp.substring(11, 13));
  const millisecond = Number(itmTimestamp.substring(13, 16));

  const date = new Date(century * 100 + year, month, day, hour, minute, second, millisecond);
  return date;
}

/**
 * @param itmTimestamp - ITM timestamp (possibly corrupted)
 * @returns UNIX timestamp or NaN (if ITM timestamp is corrupted)
 */
export function formatItmTimestamp(itmTimestamp: string | number): Date {
  const trimmed = `${itmTimestamp}`.trim();

  if (!validateItmTimestamp(trimmed)) {
    return INVALID_TIMESTAMP;
  }

  const date = itmTimestampToUnixTimestamp(trimmed);
  return date;
}
