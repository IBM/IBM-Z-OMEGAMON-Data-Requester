import { isNumber } from 'lodash';

import {
  FALCON_DATASOURCE_OPTIONS_VERSION,
  FalconDatasourceConfig as LatestVersionFalconDatasourceConfig,
  UnknownConfig,
} from 'datasource/domain/';
import { ValidateUpdaters, updateToLatestVersionSync } from 'datasource/features/versioning/common';

import { updateTo_V1 } from './FalconDatasourceConfig_V1';
import { updateTo_V2 } from './FalconDatasourceConfig_V2';
import { updateTo_V3 } from './FalconDatasourceConfig_V3';
import { updateTo_V4 } from './FalconDatasourceConfig_V4';
import { updateTo_V5 } from './FalconDatasourceConfig_V5';
import { updateTo_V6 } from './FalconDatasourceConfig_V6';
import { updateTo_V7 } from './FalconDatasourceConfig_V7';
import { updateTo_V8 } from './FalconDatasourceConfig_V8';

const unvalidatedUpdaters = [
  updateTo_V1,
  updateTo_V2,
  updateTo_V3,
  updateTo_V4,
  updateTo_V5,
  updateTo_V6,
  updateTo_V7,
  updateTo_V8,
] as const;

const falconDatasourceConfigUpdaters: ValidateUpdaters<
  typeof unvalidatedUpdaters,
  LatestVersionFalconDatasourceConfig
> = unvalidatedUpdaters;

function extractConfigVersion(options: object): number | null {
  if (!isFalconConfigOfAnyVersion(options)) {
    return null;
  }

  if ('falconVersion' in options.jsonData) {
    const { falconVersion } = options.jsonData;
    return Number(falconVersion);
  }

  /* Since we didn't find falconVersion, we know it's very first version "0" */
  return 0;
}

function extractConfigVersionOrThrow(options: object): number {
  const version = extractConfigVersion(options);
  if (version == null) {
    throw new Error("Provided Configs don't have any Falcon datasource signature");
  }
  return version;
}

export function isFalconConfigOfAnyVersion(options: object): options is UnknownConfig {
  if (!('jsonData' in options && typeof options.jsonData === 'object' && options.jsonData !== null)) {
    return false;
  }
  if ('falconVersion' in options.jsonData) {
    const { falconVersion } = options.jsonData;
    return isNumber(falconVersion);
  }

  /* FalconDatasourceJsonData initial version had 'tsoUsername' and 'itmApiUri' fields, that are unique to Falcon datasource */
  if ('tsoUsername' in options.jsonData && 'itmApiUri' in options.jsonData) {
    return true;
  }
  return false;
}

export function isFalconConfigOfLatestVersion(options: UnknownConfig): options is LatestVersionFalconDatasourceConfig {
  if (!isFalconConfigOfAnyVersion(options)) {
    return false;
  }

  const version = extractConfigVersion(options);

  if (version !== null && version > FALCON_DATASOURCE_OPTIONS_VERSION) {
    throw new Error('Falcon datasource config options version is higher than supported');
  }

  return version === FALCON_DATASOURCE_OPTIONS_VERSION;
}

export function updateDatasourceConfigToLatestVersion(options: object): LatestVersionFalconDatasourceConfig {
  const latestVersionFalconDatasourceConfig = updateToLatestVersionSync<LatestVersionFalconDatasourceConfig>(
    options,
    falconDatasourceConfigUpdaters,
    undefined,
    extractConfigVersionOrThrow
  );
  return latestVersionFalconDatasourceConfig;
}
