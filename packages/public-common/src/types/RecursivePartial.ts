// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
