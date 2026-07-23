// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

import React from 'react';

import { ConnectionLine } from './ConnectionLine';

type InputExtensionConnectionLineProps = {
  lineDefinition: string;
};

export function InputExtensionConnectionLine({ lineDefinition }: InputExtensionConnectionLineProps) {
  return (
    <ConnectionLine
      shouldStretch={true}
      connectWithTop={false}
      connectWithBottom={false}
      lineDefinition={lineDefinition}
    />
  );
}
