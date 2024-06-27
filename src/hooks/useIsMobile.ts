import { useState, useEffect } from "react";

export function useScreenDimensions() {
  const [width, setWidth] = useState<number>(
    typeof window === "undefined" ? 0 : window.innerWidth
  );
  const [height, setHeight] = useState<number>(
    typeof window === "undefined" ? 0 : window.innerHeight
  );
  const isMobile = width <= 768;

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { width, height, isMobile };
}
