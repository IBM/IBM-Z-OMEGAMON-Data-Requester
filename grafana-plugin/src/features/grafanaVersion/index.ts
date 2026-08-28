// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

import { config } from '@grafana/runtime';

export function grafanaVersionIsAtLeast(target: [number, number, number]): boolean {
  const parts = config.buildInfo.version
    .split('-')[0] // get rid of optional reference ("12.3.4-pre0" or "12.3.4-bsdhab4we8")
    ?.split('.')
    .map((n) => parseInt(n, 10));

  if (parts == null || parts.length !== target.length) {
    // This particular fallback is OK for expectsAsyncTransformers
    // I don't expect it ever fail to parse the version tho
    return true;
  }

  for (let i = 0; i < target.length; i++) {
    const a = parts[i] ?? 0;
    const b = target[i] ?? 0;
    if (a > b) return true;
    if (a < b) return false;
  }
  return true;
}

export function expectsAsyncTransformers(): boolean {
  return grafanaVersionIsAtLeast([13, 1, 0]);
}
