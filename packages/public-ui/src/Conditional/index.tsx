import { ReactNode } from 'react';

type ConditionalProps = React.PropsWithChildren<{
  enabled: boolean;
  fallback?: ReactNode;
}>;

export function Conditional({ children, enabled, fallback = null }: ConditionalProps) {
  if (enabled) {
    return children;
  }

  return fallback;
}
