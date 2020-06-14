import {
  useState, useCallback, useRef, useEffect, useMemo,
} from 'react';
import { random } from 'lodash';

export default function useChangeDelta(hasCollided: boolean): Readonly<[number, number]> {
  // const [changeX, setChangeX] = useState(0);
  // const [changeY, setChangeY] = useState(0);

  const changeDeltaX = useRef(2); // velocity x
  const changeDeltaY = useRef(2); // velocity y
  const hasCollidedPrev = useRef(false);

  const maxRandomness = 10; // max value of deviation from correct reflection on collision
  const upperRandomBound = 1.0 + ((maxRandomness / 2) / 100);
  const lowerRandomBound = 1.0 - ((maxRandomness / 2) / 100);

  // init
  useEffect(() => {
    changeDeltaX.current = (random(1) === 0) ? changeDeltaX.current * -1 : changeDeltaX.current * +1;
    changeDeltaY.current = random(1) === 0 ? changeDeltaY.current * -1 : changeDeltaY.current * +1;
  }, []);

  // keep track of previous useState
  useEffect(() => {
    hasCollidedPrev.current = hasCollided;
  });

  const changeX = useMemo(() => {
    if (hasCollided && !(hasCollidedPrev.current)) {
      const newChangeDelta = changeDeltaX.current * random(lowerRandomBound, upperRandomBound, true);

      changeDeltaX.current = newChangeDelta;

      return newChangeDelta;
    }

    return changeDeltaX.current;
  }, [hasCollided, upperRandomBound, lowerRandomBound]);

  const changeY = useMemo(() => {
    if (hasCollided && !(hasCollidedPrev.current)) {
      const newChangeDelta = changeDeltaY.current * random(lowerRandomBound, upperRandomBound, true);

      changeDeltaY.current = newChangeDelta;

      return newChangeDelta;
    }

    return changeDeltaY.current;
  }, [hasCollided, upperRandomBound, lowerRandomBound]);

  return [changeX, changeY] as const;
}