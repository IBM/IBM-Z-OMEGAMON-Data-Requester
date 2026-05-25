export type PopupData = {
  window: Window | null;
  url: string;
  onOpened: () => void;
};

export const popupStorage: Record<string, PopupData> = {};
