export type WithVersion<TVersion extends number = number> = { falconVersion: TVersion };

export type WithOptionalVersion<TVersion extends number = number> = { falconVersion?: TVersion };
