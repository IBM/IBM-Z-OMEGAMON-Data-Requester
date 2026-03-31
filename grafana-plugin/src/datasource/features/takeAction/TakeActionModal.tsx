import { css } from '@emotion/css';
import { Modal } from '@grafana/ui';
import React, { useEffect, useState } from 'react';

const modalStyle = css`
  & > div {
    padding: 0;
  }
  width: fit-content;
`;

const iframeStyle = css`
  width: 40vw;
  min-width: 36.875rem;
  height: 72vh;
  @media (min-width: 3840px) {
    max-height: 45rem;
    max-width: 58rem;
  }
  border: none;
  padding: 0;
  display: block;
`;

export function TakeActionModal({
  url,
  onDismiss,
}: {
  url: string;
  height: number;
  width: number;
  onDismiss: () => void;
}) {
  // Since this plugin doesn't have translation, modal title is translated and sent via message 'omegamon:take-action:updateModalTitle'.
  // If you are adding translations to this plugin, remove the initial modal title translation from the iframe side.
  const [modalTitle, setModalTitle] = useState('Take action');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { action, title } = event.data || {};
      if (action === 'omegamon:take-action:close') {
        onDismiss();
      }

      if (action === 'omegamon:take-action:updateModalTitle' && typeof title === 'string') {
        setModalTitle(title);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onDismiss]);

  return (
    <Modal title={modalTitle} isOpen onDismiss={onDismiss} onClickBackdrop={onDismiss} className={modalStyle}>
      <iframe className={iframeStyle} src={url} allowFullScreen />
    </Modal>
  );
}
