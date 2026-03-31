import styled from '@emotion/styled';
import { Button, Toggletip, IconButton } from '@grafana/ui';
import { ClickBubblingStopper } from 'public-ui';
import React, { useState, useCallback } from 'react';

import { tid } from 'datasource/components';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.8em;
`;

type RemoveClauseButtonProps = {
  removeClause: () => void;
};

export function RemoveClauseButton({ removeClause }: RemoveClauseButtonProps) {
  const [show, setShow] = useState(false);

  const hideToggletip = () => {
    setShow(false);
  };
  const showToggletip = () => {
    setShow(true);
  };

  const onRemoveClause = useCallback(() => {
    hideToggletip();
    removeClause();
  }, [removeClause]);

  const header = <strong>Confirm Remove</strong>;
  const footer = (
    <FooterContainer>
      <Button
        type="button"
        variant="secondary"
        onClick={hideToggletip}
        data-testid={tid('clause-editor.remove-clause-button.cancel')}
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="destructive"
        onClick={onRemoveClause}
        data-testid={tid('clause-editor.remove-clause-button.remove')}
      >
        Remove
      </Button>
    </FooterContainer>
  );

  return (
    <ClickBubblingStopper>
      <Toggletip
        onOpen={showToggletip}
        title={header}
        theme="info"
        content="Removing this filter condition will permanently remove the expression"
        footer={footer}
        closeButton={true}
        onClose={hideToggletip}
        show={show}
        placement="auto"
        data-testid={tid('clause-editor.remove-clause-button')}
      >
        <IconButton
          aria-label="delete"
          name="trash-alt"
          size="lg"
          data-testid={tid('clause-editor.remove-clause-button.trashbin-icon')}
        />
      </Toggletip>
    </ClickBubblingStopper>
  );
}
