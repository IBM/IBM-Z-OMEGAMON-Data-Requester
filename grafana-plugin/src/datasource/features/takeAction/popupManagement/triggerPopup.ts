export function triggerPopup(url: string): Window | null {
  return window.open(url, '_blank', getPopupOptions());
}

function getPopupOptions(): string {
  const parentLeft = window.screenX ?? window.screenLeft;
  const parentTop = window.screenY ?? window.screenTop;
  const parentWidth = window.outerWidth;
  const parentHeight = window.outerHeight;

  const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const clamp = (n: number, min: number, max: number): number => Math.max(Math.min(n, max), min);
  // See TakeActionModal.tsx for those fancy numbers
  const width = clamp(parentWidth * 0.4, 36.875 * remSize, 58 * remSize);
  const height = clamp(parentHeight * 0.72, 10 * remSize, 45 * remSize);

  const maxLeft = window.screen.width - width;
  const maxTop = window.screen.height - height;

  const left = clamp(parentLeft + (parentWidth - width) / 2, 0, maxLeft);
  const top = clamp(parentTop + (parentHeight - height) / 2, 0, maxTop);

  return `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`;
}
