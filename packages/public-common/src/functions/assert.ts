// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

export function assert(condition: unknown, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}
