import { useEffect, useState } from "react";
import { debounce } from "../utils";

export const useElementSize = (elementRef: React.RefObject<HTMLElement>) => {
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = elementRef.current;

    const handleResize = debounce((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const { contentRect } = entry;
        const { width, height } = contentRect;
        setElementSize({ width, height });
      }
    }, 200);

    if (!container) return;

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [elementRef]);

  return elementSize;
};
