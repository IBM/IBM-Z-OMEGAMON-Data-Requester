export type DiscriminatedUnionMap<T extends Record<K, string>, K extends keyof T> = {
  [V in T[K]]: Extract<T, Record<K, V>>;
};

/**
 * The following is an example on how this type works in practice
 */
{
  type A = { discriminant: 'a'; aKey: number };
  type B = { discriminant: 'b'; bKey: string };
  type C = A | B;

  // @ts-expect-error: unused variable
  const obj: DiscriminatedUnionMap<C, 'discriminant'> = {
    // Must have properties 'a' and 'b'

    a: { discriminant: 'a', aKey: 1 }, // 'a' value must be (assignable to) type A

    b: { discriminant: 'b', bKey: '1' }, // 'b' value must be (assignable to) type B

    // @ts-expect-error: unknown property
    bla: 1, // TS shows error on this unexpected property

    ['bla' as string]: 1, // Unfortunately, TS allows this
  };
}
