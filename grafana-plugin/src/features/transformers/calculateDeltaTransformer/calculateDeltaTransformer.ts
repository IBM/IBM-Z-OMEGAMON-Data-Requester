import { DataTransformerInfo, DataFrame, FieldType, TransformerRegistryItem } from '@grafana/data';
import { mergeMap } from 'rxjs';

import { WithOptionalVersion } from 'datasource/features/versioning/common';

import { fieldToSelectableValue, processNotices, addNotice, validateTimeStep } from 'features/transformers/common';
import { updateCalculateDeltaTransformerOptionsToLatestVersion } from 'features/versioning/calculateDeltaTransformer';

import { CalculateDeltaTransformerEditor } from './CalculateDeltaTransformerEditor';
import { CalculateDeltaTransformerOptions } from './CalculateDeltaTransformerOptions';

const PREFIX = 'Calculate delta';

export function transformFrames(frames: DataFrame[], sourceColumn: string, deltaColumnName?: string): DataFrame[] {
  return frames.map((frame) => {
    const sourceField = frame.fields.find((field) => field.name === sourceColumn);

    if (!sourceField) {
      return frame;
    }

    const { label: sourceDisplayName } = fieldToSelectableValue(sourceField);

    if (sourceField.type !== FieldType.number) {
      addNotice(
        `invalid type '${sourceField.type}' for source field '${sourceColumn}' in frame '${frame.name}', expected '${FieldType.number}'.`,
        frame,
        PREFIX
      );
      return frame;
    }

    if (sourceField.values.length === 1) {
      addNotice(`Data with only one record can not be used for 'Calculate delta' transformation.`, frame, PREFIX);
      return frame;
    }

    if (sourceField.values.length === 0) {
      return frame;
    }

    const hasValidTimeStep = !!frame.fields.find((field) => validateTimeStep(field));
    if (!hasValidTimeStep) {
      addNotice(`no time field with valid time step found in frame '${frame.name}'.`, frame, PREFIX);
      return frame;
    }

    if (sourceField.values.length === 1) {
      throw new Error(`Data with only one record can not be used for 'Calculate delta' transformation.`);
    }

    if (sourceField.values.length === 0) {
      return frame;
    }

    const values = sourceField.values.map((value, index, array) => {
      if (!Number.isFinite(value) || value < 0 || !Number.isFinite(array[index - 1]) || array[index - 1] < 0) {
        return undefined;
      }
      const delta = Number(value) - Number(array[index - 1]);
      return delta < 0 ? 0 : delta;
    });

    return {
      ...frame,
      fields: [
        ...frame.fields,
        {
          name: deltaColumnName ?? `Difference of '${sourceDisplayName}'`,
          type: FieldType.number,
          config: {},
          labels: sourceField.labels,
          values,
        },
      ],
    };
  });
}

function getCalculateDeltaTransformation(): DataTransformerInfo<CalculateDeltaTransformerOptions> {
  return {
    id: `omegamon-calculate-delta-transformation`,
    name: `OMEGAMON. 'Calculate delta'`,
    description: `'Calculate delta' for rows`,
    defaultOptions: {},
    operator: (optionsOfUnknownVersion: WithOptionalVersion) => {
      const { sourceColumn, deltaColumnName } =
        updateCalculateDeltaTransformerOptionsToLatestVersion(optionsOfUnknownVersion);
      return (source) => {
        return source.pipe(
          mergeMap(async (frameArray: DataFrame[]) => {
            if (!frameArray.length) {
              return frameArray;
            }

            if (!sourceColumn) {
              throw new Error("Source attribute should be chosen for 'Calculate delta' transformation");
            }

            const newFrames = transformFrames(frameArray, sourceColumn, deltaColumnName);
            return processNotices(newFrames, sourceColumn, PREFIX);
          })
        );
      };
    },
  };
}

export function getCalculateDeltaTransformer(): TransformerRegistryItem<CalculateDeltaTransformerOptions> {
  const transformation = getCalculateDeltaTransformation();
  return {
    id: transformation.id,
    editor: CalculateDeltaTransformerEditor,
    transformation: () => Promise.resolve(transformation),
    name: transformation.name,
    description: transformation.description,
    imageDark: '',
    imageLight: '',
  };
}
