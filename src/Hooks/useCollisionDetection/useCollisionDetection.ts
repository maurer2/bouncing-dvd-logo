import {
  useRef, useEffect, MutableRefObject, useDebugValue,
} from 'react';

export default function useCollisionDetection(
  position: number,
  objectSize: number,
  worldSize: number,
): Readonly<[MutableRefObject<boolean>, MutableRefObject<boolean>]> {
  const hasCollidedWithStart = useRef(false);
  const hasCollidedWithEnd = useRef(false);

  useEffect(() => {
    hasCollidedWithStart.current = (position <= 0);
  }, [position]);

  useEffect(() => {
    const maxPositionNotColliding = (worldSize - objectSize);

    hasCollidedWithEnd.current = (position > maxPositionNotColliding);
  }, [position, objectSize, worldSize]);

  useDebugValue(`useCollisionDetection: [${hasCollidedWithStart.current}, ${hasCollidedWithEnd.current}]`);

  return [hasCollidedWithStart, hasCollidedWithEnd] as const;
}
