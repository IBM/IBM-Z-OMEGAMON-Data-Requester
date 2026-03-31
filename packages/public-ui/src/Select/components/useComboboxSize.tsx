import { useContext, useEffect, useState } from 'react';

import { FUIComboboxContext } from '~/Select';

export function useComboboxSize() {
  const { comboboxRef: ref, input, selectedOptions } = useContext(FUIComboboxContext);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref && ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setTop(rect.bottom);
        setWidth(rect.width);
        setLeft(rect.left);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedOptions, input, ref]);

  return {
    top,
    width,
    left,
  };
}
