// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

export function normalizeToArray<T>(arg: T | T[]): T[] {
  return Array.isArray(arg) ? arg : [arg];
}
