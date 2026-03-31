import { FetchError } from '@grafana/runtime';
import { isString } from 'lodash';

export class ResourceFetchError extends Error {
  static getMessageSuffix(grafanaFetchErrorData: unknown): string {
    if (!grafanaFetchErrorData) {
      return 'unknown';
    }
    if (isString(grafanaFetchErrorData)) {
      return grafanaFetchErrorData;
    }
    if (typeof grafanaFetchErrorData !== 'object') {
      return 'unknown';
    }
    if ('message' in grafanaFetchErrorData && isString(grafanaFetchErrorData.message)) {
      return grafanaFetchErrorData.message;
    }
    if ('error' in grafanaFetchErrorData) {
      if (isString(grafanaFetchErrorData.error)) {
        return grafanaFetchErrorData.error;
      }
      return JSON.stringify(grafanaFetchErrorData.error);
    }
    return 'unknown';
  }

  constructor(public grafanaFetchError: FetchError) {
    const messagePrefix = `An error occurred while loading resource:`;
    const messageSuffix = ResourceFetchError.getMessageSuffix(grafanaFetchError.data);
    super(`${messagePrefix} ${messageSuffix}`);
  }
}
