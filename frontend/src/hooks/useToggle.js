import { useState, useCallback } from "react";

export const useToggle = ({ initialValue = false }) => {
  const [value, setValue] = useState(false);

  const toggle = useCallback(() => setValue((prev) => !prev), []);

  return [value, toggle];
};
