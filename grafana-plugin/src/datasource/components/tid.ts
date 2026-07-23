// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

export function tid(suffix: string): string {
  return `rs.falcon.${suffix}`;
}
