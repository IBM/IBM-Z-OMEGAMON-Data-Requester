// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VersionUpdaterWithPromise<TPayload> = (obj: any, payload: TPayload) => object | Promise<object>;
export type VersionUpdatersWithPromise<TPayload = undefined> = ReadonlyArray<VersionUpdaterWithPromise<TPayload>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VersionUpdater<TPayload> = (obj: any, payload: TPayload) => object;
export type VersionUpdaters<TPayload = undefined> = ReadonlyArray<VersionUpdater<TPayload>>;

type ExtractVersionFunc = (unknownVersionObj: object) => number;

function defaultExtractVersion(unknownVersionObj: object): number {
  return 'falconVersion' in unknownVersionObj && typeof unknownVersionObj.falconVersion === 'number'
    ? unknownVersionObj.falconVersion
    : 0;
}

export async function updateToLatestVersion<TLatestVersionObject, TPayload = undefined>(
  oldVersionObj: object,
  versionUpdaters: VersionUpdatersWithPromise<TPayload>,
  payload: TPayload,
  extractVersion: ExtractVersionFunc = defaultExtractVersion
): Promise<TLatestVersionObject> {
  const givenVersion = extractVersion(oldVersionObj);
  const versionUpdatersSinceGivenVersion = versionUpdaters.slice(givenVersion);

  let latestVersionObj = oldVersionObj;
  for (const updateVersion of versionUpdatersSinceGivenVersion) {
    latestVersionObj = await updateVersion(latestVersionObj, payload);
  }

  return latestVersionObj as TLatestVersionObject;
}

export function updateToLatestVersionSync<TLatestVersionObject, TPayload = undefined>(
  oldVersionObj: object,
  versionUpdaters: VersionUpdaters<TPayload>,
  payload: TPayload,
  extractVersion: ExtractVersionFunc = defaultExtractVersion
): TLatestVersionObject {
  const givenVersion = extractVersion(oldVersionObj);
  const versionUpdatersSinceGivenVersion = versionUpdaters.slice(givenVersion);

  const latestVersionObj = versionUpdatersSinceGivenVersion.reduce(
    (prevVersionObj, updateVersion) => updateVersion(prevVersionObj, payload),
    oldVersionObj
  ) as TLatestVersionObject;

  return latestVersionObj;
}
