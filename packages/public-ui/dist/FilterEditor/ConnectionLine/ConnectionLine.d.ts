import { default as React } from 'react';
export declare const lineLeftMargin = "2em";
type ConnectionLineProps = {
    /** If true, component will stretch itself on the left side of positioned ancestor.
     * Is used for InputConnectionExtender */
    shouldStretch: boolean;
    connectWithTop: boolean;
    connectWithBottom: boolean;
    lineDefinition: string;
};
export declare function ConnectionLine({ shouldStretch, connectWithTop, connectWithBottom, lineDefinition, }: ConnectionLineProps): React.JSX.Element;
export {};
