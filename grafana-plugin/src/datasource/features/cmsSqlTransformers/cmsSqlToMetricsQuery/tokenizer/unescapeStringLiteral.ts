export function unescapeStringLiteral(literal: string, quote: string): string {
  // That is basically replaceAll
  return literal.replace(new RegExp(`${quote}${quote}`, 'g'), quote);
}
