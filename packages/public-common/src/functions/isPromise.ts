/**
 * USE ONLY WHEN NECESSARY
 *
 * Generally prefer Promise(possiblePromise) instead
 *
 * The function checks if argument is promise
 * */

export function isPromise<T>(possiblePromise: T | Promise<T>): possiblePromise is Promise<T> {
  // Promise.resolve returns argument if it is promise itself (https://262.ecma-international.org/6.0/#sec-promise.resolve)
  // This construction is presented here to avoid unnecessary await
  return Promise.resolve(possiblePromise) === possiblePromise;
}
