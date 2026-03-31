import {
  DataTransformerInfo,
  DataFrame,
  FieldType,
  TransformerRegistryItem,
  QueryResultMetaNotice,
} from '@grafana/data';
import { mergeMap } from 'rxjs';

import { WithOptionalVersion } from 'datasource/features/versioning/common';

import { fieldToSelectableValue, validateTimeStep } from 'features/transformers/common';
import { updateCalculateCounterRateTransformerOptionsToLatestVersion } from 'features/versioning/calculateCounterRateTransformer';

import { CalculateCounterRateTransformerEditor } from './CalculateCounterRateTransformerEditor';
import { CalculateCounterRateTransformerOptions } from './CalculateCounterRateTransformerOptions';

const PREFIX = 'Calculate counter rate: ';

function processNotices(frames: DataFrame[], sourceColumn: string): DataFrame[] {
  const noticeArray: QueryResultMetaNotice[] = [];
  const framesWithPrefixInNotices: DataFrame[] = [];
  let framesWithSourcefield = 0;

  if (
    frames.length === 1 &&
    frames[0]?.meta?.notices &&
    frames[0]?.meta?.notices[0]?.text &&
    frames[0]?.meta?.notices[0]?.text.startsWith(PREFIX)
  ) {
    throw new Error(PREFIX + 'No frames were transformed.\n' + frames[0].meta.notices[0].text);
  }

  frames.forEach((frame) => {
    if (frame.meta?.notices) {
      frame.meta.notices.forEach((notice) => {
        if (notice.text.startsWith(PREFIX)) {
          noticeArray.push(notice);
          framesWithPrefixInNotices.push(frame);
        }
      });
    }

    const sourceField = frame.fields.find((field) => field.name === sourceColumn);
    if (sourceField) {
      framesWithSourcefield++;
    }
  });

  if (noticeArray.length === 0) {
    return frames;
  }

  const combinedMessage = [...new Set(noticeArray.map((notice) => notice.text))].join('\n');

  if (framesWithSourcefield === noticeArray.length) {
    throw new Error(PREFIX + 'No frames were transformed.\n' + combinedMessage);
  }

  const combinedNotice: QueryResultMetaNotice = {
    severity: 'warning',
    text: combinedMessage,
  };

  framesWithPrefixInNotices.forEach((frame) => {
    if (frame.meta?.notices) {
      frame.meta.notices = frame.meta.notices.filter((notice) => !notice.text.startsWith(PREFIX));
      frame.meta.notices.push(combinedNotice);
    }
  });

  return frames;
}

function addNotice(message: string, frame: DataFrame): DataFrame {
  const notice: QueryResultMetaNotice = { text: PREFIX + message, severity: 'warning' };
  frame.meta = frame.meta || {};
  frame.meta.notices = frame.meta.notices || [];
  frame.meta.notices.push(notice);
  return frame;
}

export function transformFrames(
  frames: DataFrame[],
  sourceColumn: string,
  timeColumn: string,
  counterRateColumnName?: string
): DataFrame[] {
  return frames.map((frame) => {
    const sourceField = frame.fields.find((field) => field.name === sourceColumn);
    if (!sourceField) {
      return frame;
    }

    const timeField = frame.fields.find((field) => field.name === timeColumn);
    if (!timeField) {
      addNotice(`time field '${timeColumn}' not found in frame '${frame.name}'.`, frame);
      return frame;
    }

    if (sourceField.values.length === 1) {
      addNotice(`Data with only one record can not be used for 'Calculate counter rate' transformation.`, frame);
      return frame;
    }

    if (sourceField.values.length === 0) {
      return frame;
    }

    const { label: sourceFieldBaseDisplayName } = fieldToSelectableValue(sourceField);

    if (sourceField.type !== FieldType.number) {
      addNotice(
        `invalid type '${sourceField.type}' for source field '${sourceColumn}' in frame '${frame.name}', expected '${FieldType.number}'.`,
        frame
      );
      return frame;
    }

    if (!validateTimeStep(timeField)) {
      addNotice(
        `invalid time column '${timeColumn}' for frame '${frame.name}': possible time duplication or time is not ordered.`,
        frame
      );
      return frame;
    }

    const values = sourceField.values.map((value, index, array) => {
      if (!Number.isFinite(value) || value < 0 || !Number.isFinite(array[index - 1]) || array[index - 1] < 0) {
        return undefined;
      }
      const currentValue = Number(value);
      const previousValue = Number(array[index - 1]);

      const currentTime = timeField.values[index];
      const previousTime = timeField.values[index - 1];
      const timeStep = Number(currentTime) - Number(previousTime);
      return ((currentValue < previousValue ? currentValue : currentValue - previousValue) * 60000) / timeStep;
    });

    return {
      ...frame,
      fields: [
        ...frame.fields,
        {
          name: counterRateColumnName ?? `Counter rate for '${sourceFieldBaseDisplayName}'`,
          type: FieldType.number,
          config: { unit: '/min' },
          labels: sourceField.labels,
          values,
        },
      ],
    };
  });
}

function getCalculateCounterRateTransformation(): DataTransformerInfo<CalculateCounterRateTransformerOptions> {
  return {
    id: `omegamon-calculate-counter-rate-transformation`,
    name: `OMEGAMON. Counter rate calculation`,
    description: `Calculate counter rate for rows`,
    defaultOptions: {},
    operator: (optionsOfUnknownVersion: WithOptionalVersion) => {
      const { sourceColumn, timeColumn, counterRateColumnName } =
        updateCalculateCounterRateTransformerOptionsToLatestVersion(optionsOfUnknownVersion);
      return (source) => {
        return source.pipe(
          mergeMap(async (frameArray: DataFrame[]) => {
            if (!frameArray.length) {
              return frameArray;
            }

            if (!sourceColumn) {
              throw new Error("Source attribute should be chosen for 'Calculate counter rate' transformation");
            }

            if (!timeColumn) {
              throw new Error("Time attribute should be chosen for 'Calculate counter rate' transformation");
            }

            const newFrames = transformFrames(frameArray, sourceColumn, timeColumn, counterRateColumnName);
            return processNotices(newFrames, sourceColumn);
          })
        );
      };
    },
  };
}

export function getCalculateCounterRateTransformer(): TransformerRegistryItem<CalculateCounterRateTransformerOptions> {
  const transformation = getCalculateCounterRateTransformation();
  return {
    id: transformation.id,
    editor: CalculateCounterRateTransformerEditor,
    transformation,
    name: transformation.name,
    description: transformation.description,
  };
}
