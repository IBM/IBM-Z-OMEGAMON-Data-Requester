export function throwIfNullish<T>(
  value: T | null | undefined,
  explanationWhyItShouldNotBeNullish: string
): asserts value is T {
  if (value == null) {
    throw new Error(explanationWhyItShouldNotBeNullish);
  }
}
