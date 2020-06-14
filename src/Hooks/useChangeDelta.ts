import { useRef, useEffect, MutableRefObject } from 'react';
import { random } from 'lodash';

// Readonly<[ReturnType<typeof useRef>

export default function useChangeDelta(
  hasCollided: boolean,
): Readonly<[MutableRefObject<number>, MutableRefObject<number>]> {
  const hasCollidedPrev = useRef(false);
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
    if (hasCollided && !(hasCollidedPrev.current)) {
      const newChangeDelta = changeDeltaX.current * random(lowerRandomBound, upperRandomBound, true);

      changeDeltaX.current = newChangeDelta;
    }
  }, [hasCollided, upperRandomBound, lowerRandomBound]);

  useEffect(() => {
    if (hasCollided && !(hasCollidedPrev.current)) {
      const newChangeDelta = changeDeltaY.current * random(lowerRandomBound, upperRandomBound, true);

      changeDeltaY.current = newChangeDelta;
    }
  }, [hasCollided, upperRandomBound, lowerRandomBound]);

  // keep track of previous collision state
  useEffect(() => {
    hasCollidedPrev.current = hasCollided;
  });

  return [changeDeltaX, changeDeltaY] as const;
}
