import { useRef, useEffect, type RefObject } from 'react';
import { random } from 'es-toolkit';

export default function useChangeDelta(
  startValue: number,
  hasCollided: boolean,
): [changeDelta: RefObject<number>] {
  const hasCollidedPrev = useRef(false);
  const changeDelta = useRef(startValue);

  const maxRandomness = 10; // max value of deviation from correct reflection on collision
  // prettier-ignore
  const upperRandomBound: number = 1.0 + ((maxRandomness / 2) / 100);
  // prettier-ignore
  const lowerRandomBound: number = 1.0 - ((maxRandomness / 2) / 100);

  useEffect(() => {
    changeDelta.current = random(1) === 0 ? changeDelta.current * -1 : changeDelta.current;
  }, []);

  useEffect(() => {
    if (hasCollided && !hasCollidedPrev.current) {
      const newChangeDelta = changeDelta.current * random(lowerRandomBound, upperRandomBound);

      changeDelta.current = newChangeDelta * -1;
    }
  }, [hasCollided, upperRandomBound, lowerRandomBound]);

  useEffect(() => {
    hasCollidedPrev.current = hasCollided;
  }, [hasCollided]);

  return [changeDelta] as const;
}
