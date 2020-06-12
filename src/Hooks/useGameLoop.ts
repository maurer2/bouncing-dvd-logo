import { useCallback, useRef, useEffect } from 'react';

export default function useGameLoop(isPaused: boolean, isPausedPrevious2: boolean, cb: () => void): Readonly<[number]> {
  const loopTimestamp = useRef(0);
  const isPausedPrevious = useRef(false);

  useEffect(() => {
    isPausedPrevious.current = isPaused;
  });

  const loop = useCallback(() => {
    console.log(isPausedPrevious, isPaused);

    if (!isPausedPrevious.current) {
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
