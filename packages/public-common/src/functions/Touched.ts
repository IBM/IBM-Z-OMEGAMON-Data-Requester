import { assert } from './assert';

const touchedSymbol = Symbol.for('touched');

export type WithTouched = {
  [touchedSymbol]: boolean;
};

// TODO OMUI5-1643 change API to always return boolean (`false` in case of symbol property not found at all)
export function isTouched<ANY_OBJECT>(anyObject: ANY_OBJECT): boolean | undefined {
  assert(typeof anyObject === 'object' && anyObject != null, 'wasTouched can only be used with objects');
  // @ts-expect-error complains about object not having `touchedSymbol` property, but it's fine
  const touched = anyObject[touchedSymbol] as boolean | undefined;
  return touched;
}

export function addTouchedFalse<T>(anyObject: T): T & WithTouched {
  return { ...anyObject, [touchedSymbol]: false };
}

export function addTouchedTrue<T>(anyObject: T): T & WithTouched {
  return { ...anyObject, [touchedSymbol]: true };
}
