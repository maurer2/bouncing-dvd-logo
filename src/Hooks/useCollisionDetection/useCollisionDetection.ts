import { useState } from 'react';

type UseCollisionDetection = readonly [hasCollidedWithStart: boolean, hasCollidedWithEnd: boolean];

export default function useCollisionDetection(
  position: number | null,
  objectSize: number,
  worldSize?: number,
): UseCollisionDetection {
  const [hasCollidedWithStart, setHasCollidedWithStart] = useState(false);
  const [hasCollidedWithEnd, setHasCollidedWithEnd] = useState(false);

  if (position !== null && typeof worldSize === 'number') {
    // start
    const hasPositionSmallerThanStart = position < 0;
    // frame after collision
    if (hasCollidedWithStart && !hasPositionSmallerThanStart) {
      setHasCollidedWithStart(false);
    }
    // frame during collision
    if (!hasCollidedWithStart && hasPositionSmallerThanStart) {
      setHasCollidedWithStart(true);
    }

    // end
    const maxPositionNotColliding = worldSize - objectSize;
    const hasPositionLargerThanEnd = position > maxPositionNotColliding;
    // frame after collision
    if (hasCollidedWithEnd && !hasPositionLargerThanEnd) {
      setHasCollidedWithEnd(false);
    }
    // frame during collision
    if (!hasCollidedWithEnd && hasPositionLargerThanEnd) {
      setHasCollidedWithEnd(true);
    }
  }

  return [hasCollidedWithStart, hasCollidedWithEnd] as const;
}
