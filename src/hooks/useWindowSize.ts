import { useEffect, useState } from "react";

export type UseWindowSizeReturn = [width: number, height: number, isMobile: boolean ];

export const useWindowSize = (): UseWindowSizeReturn => {
  const [size, setSize] = useState<UseWindowSizeReturn>([0, 0, false]);

  useEffect(() => {
    const updateSize = () => {
     const w = window.innerWidth;
      const h = window.innerHeight;
      setSize([w, h, w <= 1024]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};
