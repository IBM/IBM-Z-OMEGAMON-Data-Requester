import React, { ReactNode } from 'react';

import { lineLeftMargin } from './ConnectionLine';
import { FilterZIndex } from './FilterZIndex';

type LinerProps = {
  showBorder: boolean;
  children: ReactNode;
  lineDefinition: string;
};

export function Liner({ showBorder, children, lineDefinition }: LinerProps) {
  return (
    <div
      className="fui:flex fui:flex-[1_0_auto] fui:flex-row"
      style={{
        marginLeft: lineLeftMargin,
        zIndex: FilterZIndex.ConnectionLine,
      }}
    >
      <div
        className="fui:w-[3em] fui:flex-none"
        style={{
          borderLeft: showBorder ? lineDefinition : 'none',
        }}
      />
      <div className="fui:flex-[1_0_auto]">{children}</div>
    </div>
  );
}
