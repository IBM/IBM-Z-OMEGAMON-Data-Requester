import { throwIfNullish } from 'public-common';

import { Token } from './tokenizer';

// All items are 0-based. Even line numbers.
export type SubstringPosition = {
  globalStart: number;
  globalEnd: number;
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
};

// idx is line number, value is line starting pos
export type LinesMap = number[];

export function buildLinesMap(cmsSql: string): LinesMap {
  return Array.from(cmsSql).reduce(
    (acc, char, idx) => {
      if (char === '\n') {
        acc.push(idx + 1);
      }
      return acc;
    },
    [0] as LinesMap
  );
}

function getCursorPosition(linesMap: LinesMap, globalPosition: number): { line: number; column: number } {
  const result = {
    line: 0,
    column: 0,
  };
  for (let i = 0; i < linesMap.length; i++) {
    const lineStart = linesMap[i];

    if (lineStart == null || globalPosition < lineStart) {
      break;
    }
    result.line = i;
    result.column = globalPosition - lineStart;
  }

  return result;
}

function getSubstringPosition(linesMap: LinesMap, start: number, end: number): SubstringPosition {
  const startPos = getCursorPosition(linesMap, start);
  const endPos = getCursorPosition(linesMap, end);

  return {
    globalStart: start,
    globalEnd: end,
    startLine: startPos.line,
    startColumn: startPos.column,
    endLine: endPos.line,
    endColumn: endPos.column,
  };
}

function mergePositions(linesMap: LinesMap, a: SubstringPosition, b: SubstringPosition): SubstringPosition {
  const newStart = Math.min(a.globalStart, b.globalStart);
  const newEnd = Math.max(a.globalEnd, b.globalEnd);

  return getSubstringPosition(linesMap, newStart, newEnd);
}

export function getTokenPosition(token: Token, linesMap: LinesMap): SubstringPosition {
  const { startIdx, endIdx } = token;

  return getSubstringPosition(linesMap, startIdx, endIdx);
}

export function getTokensPosition(tokens: Token[], linesMap: LinesMap): SubstringPosition {
  const positions = tokens.map((token) => getTokenPosition(token, linesMap));
  const [firstPosition] = positions;
  throwIfNullish(firstPosition, 'No token provided');
  return positions.reduce((acc, currPos) => mergePositions(linesMap, acc, currPos), firstPosition);
}
