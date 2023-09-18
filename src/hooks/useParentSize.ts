import React, { useEffect, useRef, useState } from "react";

export function useParentSizeObserver() {
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
  const parentRef = useRef(null);

  useEffect(() => {
    const observeParentSize = () => {
      if (parentRef.current) {
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect;
            setParentSize({ width, height });
          }
        });

        observer.observe(parentRef.current);

        return () => {
          observer.disconnect();
        };
      }
    };

    observeParentSize();
  }, []);

  return { parentRef, parentSize };
}
