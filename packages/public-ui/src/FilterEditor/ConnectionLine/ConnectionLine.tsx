import React from 'react';

import { FilterZIndex } from './FilterZIndex';

export const lineLeftMargin = '2em';

type ConnectionLineProps = {
  /** If true, component will stretch itself on the left side of positioned ancestor.
   * Is used for InputConnectionExtender */
  shouldStretch: boolean;
  connectWithTop: boolean;
  connectWithBottom: boolean;
  lineDefinition: string;
};

export function ConnectionLine({
  shouldStretch,
  connectWithTop,
  connectWithBottom,
  lineDefinition,
}: ConnectionLineProps) {
  return (
    <div
      // Have to use [] square brackets around values, otherwise it doesn't work with data-* attributes
      className={`fui:flex fui:w-[3em] fui:flex-none fui:flex-col fui:items-stretch fui:data-[should-stretch=true]:absolute fui:data-[should-stretch=true]:top-[0] fui:data-[should-stretch=true]:bottom-[0] fui:data-[should-stretch=true]:left-[0] fui:data-[should-stretch=true]:ml-[0]`}
      style={Object.assign(
        { zIndex: FilterZIndex.ConnectionLine },
        !shouldStretch ? { marginLeft: lineLeftMargin } : null
      )}
      data-should-stretch={shouldStretch}
      data-connect-with-top={connectWithTop}
      data-connect-with-bottom={connectWithBottom}
    >
      <div className="fui:flex-[1_1_auto]" style={connectWithTop ? { borderLeft: lineDefinition } : undefined} />
      <div
        className="fui:flex-[1_1_auto]"
        style={Object.assign(
          { borderTop: lineDefinition },
          connectWithBottom ? { borderLeft: lineDefinition } : undefined
        )}
      />
    </div>
  );
}
