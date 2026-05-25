import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Alert, Button, LinkButton, Modal } from '@grafana/ui';
import React, { useCallback, useEffect, useState } from 'react';

import { popupStorage, PopupData } from './popupStorage';
import { triggerPopup } from './triggerPopup';

type PopupHandlerProps = {
  url: string;
  onDismiss: () => void;
};

const modalStyle = css`
  max-width: 80%;
  width: 80wh;
`;

const ButtonPanel = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  gap: 1.5em;
  justify-content: end;
`;

export function TakeActionPopupWarning({ url, onDismiss }: PopupHandlerProps) {
  const [status, setStatus] = useState<'waiting' | 'failed' | 'success'>('waiting');
  const [retryIdx, setRetryIdx] = useState(0);

  const closeInfo = useCallback(() => {
    setStatus('success');
    onDismiss();
  }, [onDismiss]);

  useEffect(() => {
    const data = popupStorage[url];
    if (!data) {
      // If data is not present in the storage - message from the popup was already retrieved,
      // so just close the popup
      closeInfo();
      return;
    }
    data.onOpened = closeInfo;

    const popup = data.window;

    if (popup == null) {
      setStatus('failed');
      return;
    }
    if (popup.closed) {
      setStatus('failed');
      return;
    }

    // wait for a short time in case if browser tries to trick us.
    // I never experienced it trying to, but internet suggests it might.
    const timeout = setTimeout(() => {
      if (popup.closed) {
        setStatus('failed');
        return;
      }
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [retryIdx, url, closeInfo]);

  const retry = useCallback(() => {
    // We want "something went wrong modal" open when user retries the popup opening
    // until it actually opens or until user give up and clicks "Cancel"
    // because of that, we don't change status back to 'waiting'
    // setStatus('waiting');
    const popup = triggerPopup(url);
    const popupData: PopupData = {
      onOpened: closeInfo,
      window: popup,
      url,
    };

    popupStorage[url] = popupData;
    setRetryIdx((prevVal) => prevVal + 1);
  }, [closeInfo, url]);

  if (status !== 'failed') {
    // Don't display anything until we suspect popup was blocked
    return null;
  }

  return (
    <Modal title="Take action..." isOpen onDismiss={onDismiss} onClickBackdrop={onDismiss} className={modalStyle}>
      <Alert title="It looks like Take Action popup was blocked by the browser" severity="warning">
        Please, check the browser settings and try again or open Take Action page in a new tab.
      </Alert>
      <ButtonPanel>
        <Button onClick={retry}>Retry</Button>
        {/* `rel="noopener noreferrer" ` shouldn't be used for popup window since we need it to send "I'm alive"
         * message to the original window (which is us, aka opener)
         */}
        <LinkButton variant="secondary" href={url} target="_blank" rel="noopener noreferrer">
          Open in new tab
        </LinkButton>
        <Button variant="secondary" onClick={onDismiss}>
          Close
        </Button>
      </ButtonPanel>
    </Modal>
  );
}
