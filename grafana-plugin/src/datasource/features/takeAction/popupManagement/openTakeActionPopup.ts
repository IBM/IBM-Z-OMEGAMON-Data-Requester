import { getAppEvents } from '@grafana/runtime';
import { AffinityId } from 'public-domain';

import { PopupData, popupStorage } from './popupStorage';
import { TakeActionPopupWarning } from './TakeActionPopupWarning';
import { triggerPopup } from './triggerPopup';

export function openTakeActionPopup(
  adminPublicUrl: string,
  // Empty string is just to make it clear it is possible
  agentId: string | '',
  context: Map<string, string | number>,
  // affinityId can be empty string
  affinityId: AffinityId | ''
): void {
  const params = new URLSearchParams({
    // This is needed in order to make "cancel"/"done" buttons on "take action" page
    // to close popup window instead of causing navigation in it
    mode: 'integrated',
  });

  context.forEach((value, varName) => {
    params.append(`context.${varName}`, value.toString());
  });

  agentId && params.append('agentId', agentId);
  affinityId && params.append('affinityId', affinityId);

  const takeActionUrl = `${adminPublicUrl}/en/take-action/?${params.toString()}`;

  const popup = triggerPopup(takeActionUrl);

  const pollInterval = setInterval(() => {
    if (popup?.closed) {
      clearInterval(pollInterval);
      window.location.reload();
    }
  }, 500);

  setTimeout(() => clearInterval(pollInterval), 2 * 60 * 1000);

  const popupData: PopupData = {
    onOpened: () => {
      // do nothing. Warning modal will replace it if needed
    },
    window: popup,
    url: takeActionUrl,
  };

  popupStorage[takeActionUrl] = popupData;

  getAppEvents().publish({
    type: 'show-react-modal',
    payload: {
      component: TakeActionPopupWarning,
      props: {
        url: takeActionUrl,
      },
    },
  });
}
