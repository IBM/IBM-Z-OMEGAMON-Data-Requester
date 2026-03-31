// Performs Omit on each element of union:
// OmitFromUnion<A | B, 'field'> => Omit<A, 'field'> | Omit<B, 'field'>
export type OmitFromUnion<T, K extends keyof T> = T extends object ? Omit<T, K> : never;
