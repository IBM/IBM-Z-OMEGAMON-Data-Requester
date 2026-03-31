/* eslint-disable no-restricted-imports */
import { Option } from '../types';

import { sharedApply } from './onApply';
import { onChangePreprocessor } from './OnChangePreprocessor';
import { generateOptions } from './OptionsGenerator';

export const options: Option[] = [
  {
    label: 'DB2 Subsystems',
    value: 'KDP',
    id: '%IBM.STATIC017',
    apply: sharedApply,
  },
  {
    label: 'MVS CICSTG',
    value: 'KGW',
    id: '%IBM.STATIC115',
    apply: sharedApply,
  },
  {
    label: 'IMS Subsystems',
    value: 'KIP',
    id: '%IBM.STATIC014',
    apply: sharedApply,
  },
];

export const variables: Option[] = [
  {
    id: 'db2id',
    value: '${db2id}',
    label: 'DB2 variable',
    apply: sharedApply,
  },
];

describe('OnChangePreprocessor multi', () => {
  it('empty state', () => {
    expect(onChangePreprocessor([], '', { startIdx: 0, endIdx: 0 })).toMatchSnapshot();
  });
  it('empty input', () => {
    expect(onChangePreprocessor(options, '', { startIdx: 0, endIdx: 0 })).toMatchSnapshot();
  });
  it('input is not empty and in variables', () => {
    expect(
      onChangePreprocessor([...options, ...variables], 'testOfVar:${', { startIdx: 12, endIdx: 12 })
    ).toMatchSnapshot();
  });
  it('input is not empty and in closed variables', () => {
    expect(
      onChangePreprocessor([...options, ...variables], 'testOfVar:${}', { startIdx: 12, endIdx: 12 })
    ).toMatchSnapshot();
  });
  it('input is not empty and not in variables', () => {
    expect(
      onChangePreprocessor([...options, ...variables], 'testOfVar:${}', { startIdx: 13, endIdx: 13 })
    ).toMatchSnapshot();
  });
});

describe('Options Generator', () => {
  it('empty state', () => {
    expect(generateOptions([], [], '')).toMatchSnapshot();
  });
  it('empty input', () => {
    expect(generateOptions(options, [], '')).toMatchSnapshot();
  });
  it('empty input, few options selected, all selected', () => {
    expect(generateOptions(options, [options[0]], '')).toMatchSnapshot();
  });
  it('empty input, all selected', () => {
    expect(generateOptions(options, options, '')).toMatchSnapshot();
  });
  it('some input, all selected, custom values are not allowed', () => {
    expect(generateOptions(options, options, 'testOfFunctions')).toMatchSnapshot();
  });
  it('some input, all selected, custom values are allowed', () => {
    const testInput = 'testOfFunctions';
    expect(generateOptions(options, options, testInput, 0, true)).toMatchSnapshot();
  });

  it('some input, some selected, no options returns', () => {
    expect(generateOptions(options, [options[0]], 'KD')).toMatchSnapshot();
  });

  it('some input, some selected, one option returns', () => {
    expect(generateOptions(options, [options[1]], 'KD')).toMatchSnapshot();
  });

  it('some input, some selected, few options returns', () => {
    expect(generateOptions(options, [options[1]], 'K')).toMatchSnapshot();
  });

  it('some input, some selected, allows custom - custom option returns', () => {
    const data = generateOptions(options, [options[0]], 'KD', 0, true);
    expect(data).toMatchSnapshot();
    expect(data[0].isNewCustom).toBe(true);
  });

  it('some input, some selected, allows custom - one and custom options returns', () => {
    const data = generateOptions(options, [options[1]], 'KD', 0, true);
    const customElement = data.find((el) => el.isNewCustom);
    expect(data).toMatchSnapshot();
    expect(customElement).toMatchSnapshot();
  });

  it('some input, some selected, allows custom - few and custom options returns', () => {
    const data = generateOptions(options, [options[1]], 'K', 0, true);
    expect(data).toMatchSnapshot();
  });
});
