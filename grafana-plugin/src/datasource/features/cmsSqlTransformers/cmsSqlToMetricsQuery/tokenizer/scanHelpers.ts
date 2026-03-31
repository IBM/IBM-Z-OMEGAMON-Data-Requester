export function isNumeric(character: string): boolean {
  return /[0-9]/.test(character);
}

export function isAlpha(character: string): boolean {
  return /[a-zA-Z]/.test(character);
}

export function isHexadecimalDigit(character: string): boolean {
  return /[a-fA-F0-9]/.test(character);
}

export function isAlphaNumUnderscore(character: string): boolean {
  return isAlpha(character) || isNumeric(character) || character === '_';
}

export function isWhitespace(character: string): boolean {
  return / |\t|\r|\n|\v|\f/.test(character);
}

/**
 * Scans string so long as condition predicate `cond` is met. Once `cond`
 * returns false or input character sequence ends, `scanWhile` returns
 * all the scanned character as a string
 * @param source Input string
 * @param startPos Position to start with
 * @param cond Binary predicate for a character
 * @returns Scanned characters as a string
 */
export function scanWhile(source: string, startPos: number, cond: (character: string) => boolean): string {
  let currPos = startPos;
  while (currPos < source.length && cond(source[currPos] ?? '')) {
    currPos += 1;
  }
  return source.substring(startPos, currPos);
}

/**
 * Case-insensitively matches input string against given string constant
 * @param source Input string
 * @param startPos Position to start matching with
 * @param strToMatch String constant to match
 * @returns matched string in the way it found in input string (case-wise)
 * or empty string if constant doesn't match
 */
export function scanConstant(source: string, startPos: number, strToMatch: string): string {
  const fromSource = source.substring(startPos, startPos + strToMatch.length);
  if (fromSource.toLowerCase() === strToMatch.toLowerCase()) {
    return fromSource;
  }

  return '';
}
