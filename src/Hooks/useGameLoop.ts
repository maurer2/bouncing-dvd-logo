
import { useCallback, useRef } from 'react';

export default function useGameLoop(isPausedPrevious: boolean, cb: () => void): Readonly<[() => void, () => void, () => void]> {
  const loopTimestamp = useRef(0);

  const loop = useCallback(() => {
    if (!isPausedPrevious) {
      cb();
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [isPausedPrevious, cb]);

  const startLoop = useCallback(() => {
    if (loopTimestamp.current !== 0) {
      return;
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [loop]);

  function stopLoop() {
    window.cancelAnimationFrame(loopTimestamp.current);
  }

  return [startLoop, stopLoop, loop] as const;
}
