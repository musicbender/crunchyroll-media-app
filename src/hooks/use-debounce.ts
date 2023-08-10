import { useEffect, useRef } from 'react';

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;

const useDebounce = <Func extends SomeFunction>(fn: Func, delay = 500) => {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  return ((...args: any[]) => {
    const newTimer = setTimeout(() => {
      fn(...args);
    }, delay);

    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as Func;
};

export default useDebounce;
