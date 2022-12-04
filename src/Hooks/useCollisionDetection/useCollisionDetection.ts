import { useRef, useEffect } from 'react';

import type { UseCollisionDetection } from './useCollisionDetection.types';

export default function useCollisionDetection(
  position: number,
  objectSize: number,
  worldSize: number | undefined,
): Readonly<UseCollisionDetection> {
  const hasCollidedWithStart = useRef(false);
  const hasCollidedWithEnd = useRef(false);

  useEffect(() => {
    hasCollidedWithStart.current = position <= 0;
  }, [position]);

  useEffect(() => {
    if (!worldSize) {
      hasCollidedWithEnd.current = false;
      return
    }
    const maxPositionNotColliding: number = worldSize - objectSize;

    hasCollidedWithEnd.current = position > maxPositionNotColliding;
  }, [position, objectSize, worldSize]);

  return [hasCollidedWithStart, hasCollidedWithEnd] as const;
}
