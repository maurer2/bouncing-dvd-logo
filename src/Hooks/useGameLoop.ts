import { useCallback, useRef, useEffect } from 'react';

export default function useGameLoop(isPaused: boolean, cb: () => void): Readonly<number> {
  const loopTimestamp = useRef(0);
  const isPausedPrevious = useRef(false);

  const loop = useCallback(() => {
    if (!isPausedPrevious.current) {
      cb();
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [cb]);

  useEffect(() => {
    if (loopTimestamp.current !== 0) {
      return;
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [loop]);

  useEffect(() => {
    isPausedPrevious.current = isPaused;
  });

  return loopTimestamp.current as number;
}
