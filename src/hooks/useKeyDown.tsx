import { useEffect, useRef } from "react";

export function useKeyDown(key: string, onKeyDown: () => void) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === key) {
        onKeyDown();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);
}
