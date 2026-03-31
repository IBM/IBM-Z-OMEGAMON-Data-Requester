import styled from '@emotion/styled';
import { Button } from '@grafana/ui';
import { stopPropagation } from 'public-ui';
import React from 'react';

import { tid } from 'datasource/components';

const AuxiliaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 1em;
  gap: 0.8em;
  border-left: 2px solid ${({ theme }) => theme.colors.border.strong};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

type AuxiliaryPanelProps = {
  onSave: () => void;
  onCancel: () => void;
};
export function AuxiliaryPanel({ onSave, onCancel }: AuxiliaryPanelProps) {
  return (
    // TO DO Add stopPropagation on Click
    <AuxiliaryContainer onClick={stopPropagation}>
      <Button onClick={onCancel} variant="secondary" data-testid={tid('clause-editor.edit-mode.cancel')}>
        Cancel
      </Button>
      <Button onClick={onSave} data-testid={tid('clause-editor.edit-mode.done')}>
        Done
      </Button>
    </AuxiliaryContainer>
  );
}
