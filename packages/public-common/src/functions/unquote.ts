/**
 * "'some text'" ---> "some text"
 */
export function unquote(text: string): string {
  if ((text.startsWith(`'`) && text.endsWith(`'`)) || (text.startsWith(`"`) && text.endsWith(`"`))) {
    return text.slice(1, -1);
  }
  return text;
}
