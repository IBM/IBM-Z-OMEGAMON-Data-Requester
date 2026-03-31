import React from 'react';

import { ConnectionLine } from './ConnectionLine';

type RowConnectionLineProps = {
  currItemIdx: number;
  totalItemCount: number;
  lineDefinition: string;
};

export function InterRowConnectionLine({ currItemIdx, totalItemCount, lineDefinition }: RowConnectionLineProps) {
  return (
    <ConnectionLine
      shouldStretch={false}
      connectWithTop={currItemIdx !== 0}
      connectWithBottom={currItemIdx !== totalItemCount - 1}
      lineDefinition={lineDefinition}
    />
  );
}
