import { unquote } from './unquote';

export function errorToString(error: unknown): string {
  if (typeof error === 'string') {
    return unquote(error); // Sometimes ITM error messages come wrapped in redundant quotes
  }
  if (error instanceof Error) {
    return unquote(error.message); // Sometimes ITM error messages come wrapped in redundant quotes
  }
  return String(error);
}
