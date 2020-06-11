
import { useCallback, useRef, useEffect } from 'react';

export default function useGameLoop(isPaused: boolean, cb: () => void): Readonly<[number]> {
  const loopTimestamp = useRef(0);
  const isPausedFresh = useRef(isPaused);

  useEffect(() => {
    isPausedFresh.current = isPaused;
  }, [isPaused]);

  const loop = useCallback(() => {
    console.log(isPausedFresh.current);

    if (!isPaused) {
      cb();
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [isPaused, cb]);

  useEffect(() => {
    if (loopTimestamp.current !== 0) {
      return;
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [loop]);


  return [loopTimestamp.current] as const;
}
