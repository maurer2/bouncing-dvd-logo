import React, {
  useRef,
  useCallback,
  useLayoutEffect,
  useReducer,
  useEffect,
  useState,
} from 'react';
import type { FC, ReactElement, Reducer } from 'react';
import { random } from 'lodash-es';
import { produce } from 'immer';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../Logo/Logo';
import useCollisionDetection from '../Hooks/useCollisionDetection';
import type { Dispatch, Colour } from '../Store/types';
import {
  startGame,
  triggerCollision,
  triggerCollisionEnd,
  setLastPosition,
} from '../Store/actionCreators';
import { getPlayState, getCurrentColour } from '../Store/selectors';

import * as Styles from './Playingfield.styles';
import type * as Types from './Playingfield.types';
import { reducer } from './reducer';

const getRandomValueInRange = (currentRandomValue: number, maxRandomness = 2): number => {
  // prettier-ignore
  const upperRandomBound = 0 + ((maxRandomness / 2));
  // prettier-ignore
  const lowerRandomBound = 0 - ((maxRandomness / 2));

  const randomValueInRange = random(lowerRandomBound, upperRandomBound, true);

  return Math.sign(currentRandomValue) === 1
    ? currentRandomValue + randomValueInRange
    : currentRandomValue - randomValueInRange;
};

const logoDimensions: Types.LogoDimensions = [150, 138.66];

const PlayingField: FC<Readonly<Types.PlayingfieldProps>> = (): ReactElement => {
  const dispatch: Dispatch = useDispatch();
  const isPaused: boolean = useSelector(getPlayState);
  const currentColor: Colour = useSelector(getCurrentColour);

  const [positions, dispatchLocal] = useReducer<Reducer<Types.ReducerState, Types.ReducerAction>>(
    produce(reducer),
    {
      positionX: {
        value: null,
        velocity: 0,
      },
      positionY: {
        value: null,
        velocity: 0,
      },
    },
  );
  const [playingfieldBoundingBox, setPlayingfieldBoundingBox] = useState<DOMRect | null>(null);

  const loopTimestamp = useRef(0);
  const playingfieldDomElement = useRef<HTMLDivElement | null>(null);

  const [isCollidingXStart, isCollidingXEnd] = useCollisionDetection(
    positions.positionX.value,
    logoDimensions[0],
    playingfieldBoundingBox?.width,
  );
  const [isCollidingYStart, isCollidingYEnd] = useCollisionDetection(
    positions.positionY.value,
    logoDimensions[1],
    playingfieldBoundingBox?.height,
  );

  const gameResizeObserver = useRef(
    new ResizeObserver((entries) => {
      const { contentRect } = entries[0];
      setPlayingfieldBoundingBox(contentRect);
    }),
  );
  useEffect(() => {
    const currentResizeObserver: ResizeObserver = gameResizeObserver.current;
    const currentPlayingfieldDomElement = playingfieldDomElement.current;

    if (currentPlayingfieldDomElement) {
      currentResizeObserver.observe(currentPlayingfieldDomElement);
    }

    return () => {
      if (currentPlayingfieldDomElement) {
        currentResizeObserver.unobserve(currentPlayingfieldDomElement);
      }
    };
  }, []);

  const triggerHasCollided = useCallback(() => {
    dispatch(triggerCollision());
    // todo replace with redux thunk
    setTimeout(() => {
      dispatch(triggerCollisionEnd());
    }, 800);
  }, [dispatch]);

  const loop = useCallback(() => {
    if (!isPaused) {
      if (isCollidingXStart.current || isCollidingXEnd.current) {
        // const currentRandomFactor: number = getRandomValueInRange(positions.positionX.value ?? 0);
        triggerHasCollided();
        dispatchLocal({
          type: 'TRIGGER_X_COLLISION',
          payload: 0, // todo
        });
      }

      if (isCollidingYStart.current || isCollidingYEnd.current) {
        // const currentRandomFactor: number = getRandomValueInRange(positions.positionY.value ?? 0);
        triggerHasCollided();
        dispatchLocal({
          type: 'TRIGGER_Y_COLLISION',
          payload: 0, // todo
        });
      }

      if (
        !isCollidingXStart.current &&
        !isCollidingXEnd.current &&
        !isCollidingYStart.current &&
        !isCollidingYEnd.current
      ) {
        dispatchLocal({
          type: 'TRIGGER_NEXT_POSITION',
        });
      }
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [
    isPaused,
    isCollidingXStart,
    isCollidingYStart,
    isCollidingXEnd,
    isCollidingYEnd,
    triggerHasCollided,
    // positions.positionX.value,
    // positions.positionY.value,
  ]);

  useLayoutEffect(() => {
    loopTimestamp.current = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(loopTimestamp.current);
    };
  }, [loop]);

  // set last position when entering pause mode
  useEffect(() => {
    if (!isPaused || positions.positionX.value === null || positions.positionY.value === null) {
      return;
    }
    dispatch(setLastPosition([positions.positionX.value, positions.positionY.value]));
  }, [isPaused, dispatch, positions.positionX.value, positions.positionY.value]);

  // init
  useEffect(() => {
    const width = playingfieldBoundingBox?.width;
    const height = playingfieldBoundingBox?.height;

    const totalVelocity = 8;
    const velocity1 = Math.random() >= 0.5
      ? random(1, totalVelocity - 1, true)
      : random(-1, -totalVelocity + 1, true);
    const velocity2 = Math.sign(velocity1) === 1
      ? totalVelocity - velocity1
      : totalVelocity + velocity1

    console.log(Math.abs(velocity1) + Math.abs(velocity2));

    // const [startVelocityX, startVelocityY] = Array.from(Array(2)).reduce((remainder, maxValue, _, arr) => {
    //   return random(1, maxValue - (1 * (arr.length -1)), true); // allow remaining values do be at least 1
    // }, {
    //   values: [] as number[],
    //   totalVelocity,
    // });

    // .map(() => Math.random() >= 0.5
    //   ? velocity + Math.random() / 2
    //   : -velocity - Math.random() / 2
    // )


    if (!width || !height) {
      return;
    }

    dispatchLocal({
      type: 'TRIGGER_INITIAL_POSITION',
      payload: {
        worldSize: {
          width,
          height,
        },
        logoSize: logoDimensions,
        startVelocityX: velocity1,
        startVelocityY: velocity2,
      },
    });

    dispatch(startGame());
  }, [dispatch, playingfieldBoundingBox]);

  return (
    <Styles.PlayingFieldWrapper
      ref={playingfieldDomElement}
      data-testid="playfingfield"
    >
      {positions.positionX.value !== null && positions.positionY.value !== null && (
        <Logo
          positionX={positions.positionX.value}
          positionY={positions.positionY.value}
          width={logoDimensions[0]}
          height={logoDimensions[1]}
          currentColour={currentColor}
          isPaused={isPaused}
        />
      )}
    </Styles.PlayingFieldWrapper>
  );
};

export default PlayingField;
