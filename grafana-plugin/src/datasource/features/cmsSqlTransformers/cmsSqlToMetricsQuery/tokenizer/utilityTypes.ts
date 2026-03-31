import { UnionToIntersection } from 'public-common';

type BuildKind<SPECIFIC_KIND extends string, GENERIC_KIND extends string> = `${SPECIFIC_KIND}_${GENERIC_KIND}`;

type PostfixObjectKeys<T extends object, POSTFIX extends string> = {
  [K in keyof T as BuildKind<K & string, POSTFIX>]: T[K];
};
type BuildFullKind<T extends object> = {
  [K in keyof T]: PostfixObjectKeys<T[K] & object, K & string>;
};

type FlattenObject<T extends object> = UnionToIntersection<T[keyof T]>;

export type TokenKindsFromTokenMap<T extends object> = keyof FlattenObject<BuildFullKind<T>>;

// Converts ['a', 'b', 'c'] to {a: 'a', b: 'b', c: 'c'}
export type ConvertGroupToTokenMap<T extends string[]> = {
  [K in T[number]]: K;
};

// Converts {x: ['a', 'b'], y: ['c']} to {x: {a: 'a', b: 'b'}, y: {c: 'c'}}
export type ConvertToTokenMap<T extends object> = {
  [GROUP in keyof T]: ConvertGroupToTokenMap<T[GROUP] & string[]>;
};
