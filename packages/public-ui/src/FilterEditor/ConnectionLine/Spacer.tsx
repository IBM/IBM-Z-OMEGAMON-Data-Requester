import React from 'react';

import { Liner } from './Liner';

type SpacerProps = {
  lineDefinition: string;
};

export function Spacer({ lineDefinition }: SpacerProps) {
  return (
    <Liner showBorder={true} lineDefinition={lineDefinition}>
      <div className="fui:h-[1em]" />
    </Liner>
  );
}
