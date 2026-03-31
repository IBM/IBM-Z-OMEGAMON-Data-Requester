import { default as React, Component, ReactNode } from 'react';
interface Props {
    children: ReactNode;
    fallbackTitle?: string;
    fallbackSubtitle?: string;
}
interface State {
    error: Error | null;
}
export declare class InlineNotificationErrorBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(error: Error): State;
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
}
export {};
