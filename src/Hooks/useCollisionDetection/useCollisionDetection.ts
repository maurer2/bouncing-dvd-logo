import { useState } from 'react';

type UseCollisionDetection = readonly [hasCollidedWithStart: boolean, hasCollidedWithEnd: boolean];

export default function useCollisionDetection(
  position: number | null,
  objectSize: number,
  worldSize?: number,
): UseCollisionDetection {
  const [hasCollidedWithStart, setHasCollidedWithStart] = useState(false);
  const [hasCollidedWithEnd, setHasCollidedWithEnd] = useState(false);

  // eslint-disable-next-line lodash/prefer-lodash-typecheck
  if (position !== null && typeof worldSize === 'number') {
    // start stuff
    const hasPositionSmallerThanStart = position < 0;
    if (hasCollidedWithStart && !hasPositionSmallerThanStart) {
      setHasCollidedWithStart(false);
    }
    if (!hasCollidedWithStart && hasPositionSmallerThanStart) {
      setHasCollidedWithStart(true);
    }

    // end stuff
    const maxPositionNotColliding = worldSize - objectSize;
    const hasPositionLargerThanEnd = position > maxPositionNotColliding;
    if (hasCollidedWithEnd && !hasPositionLargerThanEnd) {
      setHasCollidedWithEnd(false);
    }
    if (!hasCollidedWithEnd && hasPositionLargerThanEnd) {
      setHasCollidedWithEnd(true);
    }
  }

  return [hasCollidedWithStart, hasCollidedWithEnd] as const;
}
