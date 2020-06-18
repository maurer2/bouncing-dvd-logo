import { useRef, useEffect, MutableRefObject } from 'react';
import { random } from 'lodash';

// Readonly<[ReturnType<typeof useRef>

export default function useChangeDelta(
  hasCollidedX: boolean,
  hasCollidedY: boolean,
): Readonly<[MutableRefObject<number>, MutableRefObject<number>]> {
  const hasCollidedXPrev = useRef(false);
  const hasCollidedYPrev = useRef(false);
  const changeDeltaX = useRef(2);
  const changeDeltaY = useRef(2);

  const maxRandomness = 10; // max value of deviation from correct reflection on collision
  const upperRandomBound = 1.0 + ((maxRandomness / 2) / 100);
  const lowerRandomBound = 1.0 - ((maxRandomness / 2) / 100);

  // init
  useEffect(() => {
    changeDeltaX.current = (random(1) === 0) ? changeDeltaX.current * -1 : changeDeltaX.current * +1;
    changeDeltaY.current = random(1) === 0 ? changeDeltaY.current * -1 : changeDeltaY.current * +1;
  }, []);

  useEffect(() => {
    if (hasCollidedX && !(hasCollidedXPrev.current)) {
      let newChangeDelta = changeDeltaX.current * random(lowerRandomBound, upperRandomBound, true);

      newChangeDelta = (Math.sign(newChangeDelta) === 1) ? Math.abs(newChangeDelta) * -1 : Math.abs(newChangeDelta);

      changeDeltaX.current = newChangeDelta;
    }
  }, [hasCollidedX, upperRandomBound, lowerRandomBound]);

  useEffect(() => {
    if (hasCollidedY && !(hasCollidedYPrev.current)) {
      let newChangeDelta = changeDeltaY.current * random(lowerRandomBound, upperRandomBound, true);

      newChangeDelta = (Math.sign(newChangeDelta) === 1) ? Math.abs(newChangeDelta) * -1 : Math.abs(newChangeDelta);

      changeDeltaY.current = newChangeDelta;
    }
  }, [hasCollidedY, upperRandomBound, lowerRandomBound]);

  // keep track of previous collision state
  useEffect(() => {
    hasCollidedXPrev.current = hasCollidedX;
    hasCollidedYPrev.current = hasCollidedY;
  });

  return [changeDeltaX, changeDeltaY] as const;
}
