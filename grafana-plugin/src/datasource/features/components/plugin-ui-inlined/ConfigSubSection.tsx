/**
 * ConfigSubSection component - inlined from @grafana/plugin-ui v0.10.10
 * Source: https://unpkg.com/@grafana/plugin-ui@0.10.10/dist/esm/components/ConfigEditor/ConfigSection/ConfigSubSection.js
 * License: Apache-2.0
 */

import React from 'react';

import { GenericConfigSection, type Props as GenericConfigSectionProps } from './GenericConfigSection';

type Props = Omit<GenericConfigSectionProps, 'kind'>;

export const ConfigSubSection = ({ children, ...props }: React.PropsWithChildren<Props>) => {
  return (
    <GenericConfigSection {...props} kind="sub-section">
      {children}
    </GenericConfigSection>
  );
};
