import { useCallback, useRef } from 'react';

export function useDebounce(fn: () => void, delay = 500) {
  let timer = useRef<any>(null);
  return useCallback(function () {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      fn();
      timer.current = null;
    }, delay);
  }, []);
}
