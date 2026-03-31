export function debounce<F extends (...args: Parameters<F>) => void>(
  func: F,
  msOfDelay: number
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), msOfDelay);
  };
}
