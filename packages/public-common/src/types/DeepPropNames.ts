type Append<A extends string, B extends string | number> = A extends '' ? B & string : `${A}.${B}`;
type PropTypes<T extends object> = T[keyof T]; // { n: number, s: string} => number | string
type GetKey<VALUE extends string> = VALUE extends `${string}.*` ? never : VALUE;
type ExtractKeys<T, PREFIX extends string> =
  T extends Array<infer L>
    ? GetKey<PREFIX> | ExtractKeys<L, Append<PREFIX, '*'>>
    : T extends object
      ? GetKey<PREFIX> | DeepPropNames<T, PREFIX>
      : GetKey<PREFIX>;
type TypeMapper<T, K extends keyof T, PREFIX extends string> = string extends K
  ? GetKey<PREFIX> | ExtractKeys<T[K], Append<PREFIX, '*'>> // Record<string
  : number extends K
    ? GetKey<PREFIX> | ExtractKeys<T[K], Append<PREFIX, '*'>> // Record<number
    : ExtractKeys<T[K], Append<PREFIX, K & (string | number)>>;
type TypeMap<T, PREFIX extends string> = {
  [K in keyof T]: TypeMapper<T, K, PREFIX>;
};
export type DeepPropNames<T extends object, PREFIX extends string = ''> = PropTypes<TypeMap<T, PREFIX>>;
