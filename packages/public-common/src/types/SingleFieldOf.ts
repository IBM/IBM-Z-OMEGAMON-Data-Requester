/**
 * type AB = SingleFieldOf<{a: string; b: string;}>
 * const a: AB = {a: 'test'} // OK
 * const b: AB = {b: 'test'} // OK
 * const ab: AB = {a: 'test', b: 'test' } // NOT OK
 */

type _SingleFieldOf<T extends object, K extends keyof T> = K extends string
  ? { [KK in Exclude<keyof T, K>]?: never } & { [P in K]: T[P] }
  : never;
export type SingleFieldOf<T extends object, AVAILABLE_PROPS extends keyof T = keyof T> = _SingleFieldOf<
  T,
  AVAILABLE_PROPS
>;
