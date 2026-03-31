import { TextSelection, Option } from '~/Select';

export function sharedApply(this: Option, input: string, selection: TextSelection) {
  const value =
    input.substring(0, selection.startIdx) +
    this.value +
    (selection.endIdx > 0 ? input.substring(selection.endIdx + 1) : '');
  return value;
}
