/**
 * ConfigSection component - inlined from @grafana/plugin-ui to avoid internal package dependency
 * Source: https://github.com/grafana/plugin-ui/blob/main/src/components/ConfigEditor/ConfigSection/ConfigSection.tsx
 * License: Apache-2.0
 */

import React from 'react';

import { GenericConfigSection, type Props as GenericConfigSectionProps } from './GenericConfigSection';

type Props = Omit<GenericConfigSectionProps, 'kind'>;

export const ConfigSection = ({ children, ...props }: React.PropsWithChildren<Props>) => {
  return (
    <GenericConfigSection {...props} kind="section">
      {children}
    </GenericConfigSection>
  );
};
