import { DeepPropNames } from './DeepPropNames';
import { PickNonNever } from './FilterProperties';

type FilterByPrefix<T extends string | number, PREFIX extends string> = T extends `${PREFIX}${string}` ? T : never;
type Props<T extends object> = string & keyof T;

type PrepareMapType<T extends object, K extends Props<T>, PROPS extends DeepPropNames<T>> = [PROPS] extends [never]
  ? never // PROPS'es 'REST' wasn't succesfully infered in parent's step
  : K extends PROPS
    ? T[K] // regular field of an object:  DeepPick<{ propName: SOMETHING }, 'propName'>
    : string extends K // T is a map: Record<string, SOMETHING> or { [key: string]: SOMETHING }
      ? [PROPS] extends [`*.${infer REST}`]
        ? DeepPick<T[K] & object, REST & DeepPropNames<T[K] & object>>
        : never
      : number extends K // T is an array: Record<number, SOMETHING> or { [key: number]: SOMETHING } or SOMETHING[]
        ? [PROPS] extends [`*.${infer REST}`]
          ? DeepPick<T[K] & object, REST & DeepPropNames<T[K] & object>>
          : never
        : // T is an object and PROPS select some subset of fields of T[K]
          [PROPS] extends [`${K}.${infer REST}`]
          ? DeepPick<T[K] & object, REST & DeepPropNames<T[K] & object>>
          : never;

type PrepareDeepPickMap<T extends object, PROPS extends DeepPropNames<T>> = {
  [K in keyof T]: PrepareMapType<T, K & string, FilterByPrefix<PROPS, K & string>>;
};

export type DeepPick<T extends object, PROPS extends DeepPropNames<T>> = PickNonNever<PrepareDeepPickMap<T, PROPS>>;
