import React, { useRef, useCallback, useLayoutEffect, useReducer, useEffect } from 'react';
import type { FC, ReactElement, Reducer } from 'react';
import { random } from 'lodash-es';
import { produce } from 'immer';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../Logo/Logo';
import useCollisionDetection from '../Hooks/useCollisionDetection';
import type { Dispatch, Colour } from '../Store/types';
import { startGame, triggerCollision, triggerCollisionEnd, setLastPosition } from '../Store/actionCreators';
import { getPlayState, getIsPlayingSoundState, getCurrentColour } from '../Store/selectors';

import * as Styles from './Playingfield.styles';
import type * as Types from './Playingfield.types';
import { reducer } from './reducer'

const logoDimensions: Types.LogoDimensions = [150, 138];

const getRandomValueInRange = (currentRandomNess: number, maxRandomness = 100): number => {
  // prettier-ignore
  const upperRandomBound = 0 + ((maxRandomness / 2) / 100);
  // prettier-ignore
  const lowerRandomBound = 0 - ((maxRandomness / 2) / 100);

  const randomValueInRange = random(lowerRandomBound, upperRandomBound, true);

  return Math.sign(currentRandomNess) === 1
    ? currentRandomNess + randomValueInRange
    : currentRandomNess - randomValueInRange;
};

const PlayingField: FC<Readonly<Types.PlayingfieldProps>> = (): ReactElement => {
  const dispatch: Dispatch = useDispatch();
  const isPaused: boolean = useSelector(getPlayState);
  const currentColor: Colour = useSelector(getCurrentColour);

  const [positions, dispatchLocal] = useReducer<Reducer<Types.ReducerState, Types.ReducerAction>>(
    produce(reducer),
    {
      positionX: {
        value: 1,
        velocity: 4,
        randomness: 0,
      },
      positionY: {
        value: 1,
        velocity: 4,
        randomness: 0,
      },
    },
  );
  const loopTimestamp = useRef(0);
  const playingfieldDomElement = useRef<HTMLDivElement | null>(null);
  const playingfieldBoundingBox = useRef<DOMRect | null>(null);
  const [isCollidingXStart, isCollidingXEnd] = useCollisionDetection(
    positions.positionX.value,
    logoDimensions[0],
    playingfieldBoundingBox.current?.width,
  );
  const [isCollidingYStart, isCollidingYEnd] = useCollisionDetection(
    positions.positionY.value,
    logoDimensions[1],
    playingfieldBoundingBox.current?.height,
  );

  const gameResizeObserver = useRef(
    new ResizeObserver((entries) => {
      const { contentRect } = entries[0];
      playingfieldBoundingBox.current = contentRect;
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

  const updateLastPosition = useCallback(() => {
    dispatch(setLastPosition([positions.positionX.value, positions.positionY.value]));
  }, [dispatch, positions.positionX.value, positions.positionY.value]);

  useEffect(() => {
    const width = playingfieldBoundingBox.current?.width;
    const height = playingfieldBoundingBox.current?.height;

    // todo 0 falsy
    if (width && height) {
      dispatchLocal({
        type: 'TRIGGER_INITIAL_POSITION',
        payload: {
          worldSize: {
            width,
            height,
          },
          logoSize: logoDimensions,
        },
      });
    }
  }, [playingfieldBoundingBox.current?.width, playingfieldBoundingBox.current?.height]);

  const loop = useCallback(() => {
    if (!isPaused) {
      if (isCollidingXStart.current || isCollidingXEnd.current) {
        dispatchLocal({
          type: 'TRIGGER_X_COLLISION',
        });
        triggerHasCollided();
      }

      if (isCollidingYStart.current || isCollidingYEnd.current) {
        dispatchLocal({
          type: 'TRIGGER_Y_COLLISION',
        });
        triggerHasCollided();
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
        // todo trigger only on pause
        updateLastPosition();
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
    updateLastPosition,
  ]);

  useLayoutEffect(() => {
    loopTimestamp.current = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(loopTimestamp.current);
    };
  }, [loop]);

  // init
  useEffect(() => {
    dispatch(startGame());
  }, [dispatch]);

  return (
    <Styles.PlayingFieldWrapper
      ref={playingfieldDomElement}
      data-testid="playfingfield"
    >
      <Logo
        positionX={positions.positionX.value}
        positionY={positions.positionY.value}
        width={logoDimensions[0]}
        height={logoDimensions[1]}
        currentColour={currentColor}
        isPaused={isPaused}
      />
    </Styles.PlayingFieldWrapper>
  );
};

export default PlayingField;
