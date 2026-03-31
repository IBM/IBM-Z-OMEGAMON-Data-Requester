// FilterProperties<{
//   a: string,
//   b: string | number,
//   c: 23,
//   d: '42'
// }, string>
// resolves into {a: string, d: '42'}
export type FilterProperties<T, CONDITION> = Pick<T, { [K in keyof T]: T[K] extends CONDITION ? K : never }[keyof T]>;

// FilterPropertiesOut<{
//   a: string,
//   b: string | number,
//   c: 23,
//   d: '42'
// }, string>
// resolves into {b: string | number, c: 23}
export type FilterPropertiesOut<T, CONDITION> = Pick<
  T,
  { [K in keyof T]: T[K] extends CONDITION ? never : K }[keyof T]
>;

// PickNonNever<{a: string; b: never;} => {a: string;}
export type PickNonNever<T extends object> = FilterPropertiesOut<T, never>;
