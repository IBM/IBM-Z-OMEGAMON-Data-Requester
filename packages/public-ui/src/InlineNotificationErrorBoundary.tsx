import { InlineNotification } from '@carbon/react';
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

interface State {
  error: Error | null;
}

export class InlineNotificationErrorBoundary extends Component<Props, State> {
  state: State = {
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      const title = this.props.fallbackTitle ?? 'Unexpected error occurred';

      const subtitle = this.state.error.message ?? this.props.fallbackSubtitle;

      return (
        <div className="w-full">
          <InlineNotification kind="error" title={title} subtitle={subtitle} hideCloseButton className="w-full" />
        </div>
      );
    }

    return this.props.children;
  }
}
