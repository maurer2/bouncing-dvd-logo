import {
  useRef, useEffect, MutableRefObject, useDebugValue,
} from 'react';
import { random } from 'lodash';

// Readonly<[ReturnType<typeof useRef>

export default function useChangeDelta(
  startValue: number,
  hasCollided: boolean,
): Readonly<[MutableRefObject<number>]> {
  const hasCollidedPrev = useRef(false);
  const changeDelta = useRef(startValue);

  const maxRandomness = 10; // max value of deviation from correct reflection on collision
  const upperRandomBound = 1.0 + ((maxRandomness / 2) / 100);
  const lowerRandomBound = 1.0 - ((maxRandomness / 2) / 100);

  // init
  useEffect(() => {
    changeDelta.current = (random(1) === 0) ? changeDelta.current * -1 : changeDelta.current * +1;
  }, []);

  useEffect(() => {
    if (hasCollided && !(hasCollidedPrev.current)) {
      const newChangeDelta = changeDelta.current * random(lowerRandomBound, upperRandomBound, true);

      changeDelta.current = newChangeDelta * -1;
    }
  }, [hasCollided, upperRandomBound, lowerRandomBound]);

  useEffect(() => {
    hasCollidedPrev.current = hasCollided;
  });

  useDebugValue(`useChangeDelta: ${changeDelta.current}`);

  return [changeDelta] as const;
}
