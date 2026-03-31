import { ReactNode } from 'react';
type ConditionalProps = React.PropsWithChildren<{
    enabled: boolean;
    fallback?: ReactNode;
}>;
export declare function Conditional({ children, enabled, fallback }: ConditionalProps): ReactNode;
export {};
