import { useState, useCallback, ChangeEvent } from "react";

export type onChangeType = (e: ChangeEvent<HTMLInputElement>) => void;

export default function useInput(initValue = "") {
  const [value, setValue] = useState(initValue);

  const handler = useCallback((e: any) => {
    if (e && e.target) setValue(e.target.value);
  }, []);

  return [value, handler, setValue] as [string, onChangeType, typeof setValue];
}
