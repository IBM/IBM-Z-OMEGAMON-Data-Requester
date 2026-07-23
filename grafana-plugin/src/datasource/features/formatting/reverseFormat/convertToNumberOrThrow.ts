// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

export function convertToNumberOrThrow(val: string | number): number {
  if (typeof val === 'number') {
    return val;
  }
  const number = Number(val);
  if (isNaN(number)) {
    throw new Error(`Failed to convert string "${val}" to number.`);
  }
  return number;
}
