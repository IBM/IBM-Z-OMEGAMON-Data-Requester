import React, { PropsWithChildren } from 'react';

import { stopPropagation } from '~/functions';

export function ClickBubblingStopper({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="fui:flex" onClick={stopPropagation}>
      {children}
    </div>
  );
}
