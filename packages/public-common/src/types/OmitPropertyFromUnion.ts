/**
 * KeysOfUnion<T> iterates over each member of a union type T
 * to collect all keys from each member into a single union of keys.
 *
 * @example
 * type ExampleUnion = { a: number; b: string } | { b: number; c: boolean } | { d: string };
 * type Result = KeysOfUnion<ExampleUnion>;
 * Result: "a" | "b" | "c" | "d"
 */

type KeysOfUnion<T> = T extends unknown ? keyof T : never;

/**
 * OmitPropertyFromUnion<T, PROPS_TO_REMOVE> removes the specified
 * PROPS_TO_REMOVE properties from each type in the union T.
 *
 * @example
 * type ExampleUnion = { a: number; b: string } | { b: string; c: boolean } | { d: string };
 * type Result = OmitPropertyFromUnion<ExampleUnion, 'b'>;
 * Result: { a: number } | { c: boolean } | { d: string}
 */

export type OmitPropertyFromUnion<T, PROPS_TO_REMOVE extends KeysOfUnion<T>> = T extends unknown
  ? Omit<T, PROPS_TO_REMOVE>
  : never;
