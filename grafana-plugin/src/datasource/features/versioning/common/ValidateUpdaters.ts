type BothAreTrue<A, B> = A extends true ? (B extends true ? true : false) : false;

type AreSameTypes<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

type ExtractResultType<Updater> = Updater extends (...arg: never[]) => infer X ? X : never;

type ExtractFromPossiblePromise<T> = T extends Promise<infer X> ? X : T;

type UpdaterResultType<Updater> = ExtractFromPossiblePromise<ExtractResultType<Updater>>;

type FirstElement<TArray> = TArray extends readonly [infer X, ...unknown[]] ? X : never;

type UpdaterInputType<Updater> = Updater extends (...args: infer X) => unknown ? FirstElement<X> : false;

// prettier-ignore
type ValidateUpdater<Updater, ExpectedResultType, ExpectedVersion extends number> = AreSameTypes<UpdaterResultType<Updater>, ExpectedResultType>

// prettier-ignore
type ValidateUpdaters_<Updaters extends readonly unknown[], LastUpdaterResult> = (
  Updaters extends readonly [] ? true
  : Updaters extends readonly [...infer REST, infer Updater] ?
  BothAreTrue<
    ValidateUpdater<Updater, LastUpdaterResult, Updaters['length']>,
    ValidateUpdaters_<REST, UpdaterInputType<Updater>>
  >
  : never
)

// prettier-ignore
export type ValidateUpdaters<Updaters extends readonly unknown[], LastUpdaterResult> = (
  ValidateUpdaters_<
    Updaters,
    LastUpdaterResult
  > extends true
  ? Updaters
  : never
);
