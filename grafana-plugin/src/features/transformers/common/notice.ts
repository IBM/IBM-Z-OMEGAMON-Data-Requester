import { DataFrame, QueryResultMetaNotice } from '@grafana/data';
import { uniq } from 'lodash';

/**
 * Combines notices with matching prefix across frames.
 *
 * @param frames - Array of DataFrame objects to process
 * @param sourceColumn - Name of the source column being transformed
 * @param prefix - Notice text prefix to filter by (e.g., "Calculate delta")
 * @returns Modified frames with combined notices, or throws error if all frames failed transformation
 */
export function processNotices(frames: DataFrame[], sourceColumn: string, prefix: string): DataFrame[] {
  const prefixWithColon = `${prefix}: `;

  const prefixNotices = frames
    .flatMap((frame) => frame.meta?.notices ?? [])
    .filter((notice) => notice.text.startsWith(prefixWithColon));

  if (prefixNotices.length === 0) {
    return frames;
  }

  const uniqueMessages = uniq(prefixNotices.map((notice) => notice.text));
  const framesWithSourceField = frames.filter((frame) =>
    frame.fields.some((field) => field.name === sourceColumn)
  ).length;

  if (framesWithSourceField === prefixNotices.length) {
    throw new Error(`${prefixWithColon}No frames were transformed.\n${uniqueMessages.join('\n')}`);
  }

  const combinedNotice: QueryResultMetaNotice = {
    severity: 'warning',
    text: uniqueMessages.join('\n'),
  };

  return frames.map((frame) => {
    const frameNotices = frame.meta?.notices ?? [];
    const hasPrefix = frameNotices.some((notice) => notice.text.startsWith(prefixWithColon));

    if (!hasPrefix) {
      return frame;
    }

    return {
      ...frame,
      meta: {
        ...frame.meta,
        notices: [...frameNotices.filter((notice) => !notice.text.startsWith(prefixWithColon)), combinedNotice],
      },
    };
  });
}

export function addNotice(message: string, frame: DataFrame, prefix: string): DataFrame {
  const notice: QueryResultMetaNotice = { text: `${prefix}: ${message}`, severity: 'warning' };
  frame.meta = frame.meta ?? {};
  frame.meta.notices = frame.meta.notices ?? [];
  frame.meta.notices.push(notice);
  return frame;
}
