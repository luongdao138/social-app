import { useCallback } from 'react';
import { useState } from 'react';

export const useToggle = (initalValue = false) => {
  const [state, setState] = useState(initalValue);

  const toggleState = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  return [state, toggleState];
};
