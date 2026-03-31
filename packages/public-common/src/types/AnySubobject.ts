// (Recurcively) returns a union of any object-like field and T itself
//
// type A = {
//   a1: number;
//   a2: string;
// }
//
// type B = {
//   b1: A;
//   b2: string;
// }
//
// type C = {
//   c1: B;
//   c2: boolean;
// }
//
// AnySubobject<C> => A | B | C;

// KNOWN is used to break infinite looping over recursive structures
// It contains all the types we already have visited
type ExtractSubobjects<T, KNOWN> = T extends object ? (T extends KNOWN ? never : AnySubobject<T, KNOWN>) : never;
export type AnySubobject<T extends object, KNOWN = never> = T | ExtractSubobjects<T[keyof T], KNOWN | T>;
