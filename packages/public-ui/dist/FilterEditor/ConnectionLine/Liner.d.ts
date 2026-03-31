import { default as React, ReactNode } from 'react';
type LinerProps = {
    showBorder: boolean;
    children: ReactNode;
    lineDefinition: string;
};
export declare function Liner({ showBorder, children, lineDefinition }: LinerProps): React.JSX.Element;
export {};
