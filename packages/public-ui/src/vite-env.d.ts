// Copyright contributors to the IBM-Z-OMEGAMON-data-requester project.

/// <reference types="vite/client" />

declare module '*.svg?react' {
  import * as React from 'react';

  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
