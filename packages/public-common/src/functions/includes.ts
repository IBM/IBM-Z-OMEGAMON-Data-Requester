/**
 * Wrapper on top of Array.includes, that fixes some of it's annoying problems.
 * (If interested, can check here https://github.com/microsoft/TypeScript/issues/26255)
 * (Btw, `lodash` `includes` does not seem to be good enough either.)
 */
export function includes<const TSearchElement, const TArray extends readonly TSearchElement[]>(
  array: TArray,
  searchElement: TSearchElement,
  fromIndex?: number | undefined
): searchElement is TArray[number] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return array.includes(searchElement as any, fromIndex);
}

/**
 * The following examples show what problems `Array.includes` (but not `includes`) has.
 * Uncomment to play with the examples.
 */

/**
 * E.g. #1
 */
// type AlphabetLetter = 'a' | 'b' | 'c';
// const alphabetLetter = 'a';
// const _r1 = ['a', '1'].includes(alphabetLetter as string);
// const _r2 = ['a', '1'].includes('d');
// const _r3 = ['a', '1'].includes(alphabetLetter as AlphabetLetter);
// const _r4 = includes(['a', '1'], alphabetLetter); // <--- Shows error on '1'
// const _r5 = includes(['a', '1'], alphabetLetter as 'a'); // <--- Shows error on '1'
// const _r6 = includes(['a', 'b'], alphabetLetter as AlphabetLetter);
// const _r7 = includes(['a', 'b', 'c', '1'], alphabetLetter as AlphabetLetter); // <--- Shows error on '1'

/**
 * E.g. #2
 */
// type Wider = 1 | 2 | 3;
// type Narrower = 1 | 2;
// const someNumberFromWider = 1 as Wider;
// const arrayFromNarrower = [1, 2] as Narrower[];
// arrayFromNarrower.includes(someNumberFromWider);
// includes(arrayFromNarrower, someNumberFromWider); // <--- Allows and does not show unwanted error
// if (includes(arrayFromNarrower, someNumberFromWider)) {
//   someNumberFromWider; // <--- type = Narrower
// }
