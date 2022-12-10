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
import { reducers } from './reducers';

const getInverseVelocity = (currentVelocity: number, maxRandomness = 10): number => {
  // prettier-ignore
  const upperRandomBound = 1.0 + ((maxRandomness / 2) / 100);
  // prettier-ignore
  const lowerRandomBound = 1.0 - ((maxRandomness / 2) / 100);
  const newInverseVelocity =
    currentVelocity * random(lowerRandomBound, upperRandomBound, true) * -1;

  return newInverseVelocity;
};

const logoSize: Types.LogoDimensions = [150, 138.66];

const PlayingField: FC<Readonly<Types.PlayingfieldProps>> = (): ReactElement => {
  const dispatch: Dispatch = useDispatch();
  const isPaused: boolean = useSelector(getPlayState);
  const currentColor: Colour = useSelector(getCurrentColour);

  const [positions, dispatchLocal] = useReducer<Reducer<Types.ReducerState, Types.ReducerAction>>(
    reducers,
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
    logoSize[0],
    playingfieldBoundingBox?.width,
  );
  const [isCollidingYStart, isCollidingYEnd] = useCollisionDetection(
    positions.positionY.value,
    logoSize[1],
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
    if (!isPaused && positions.positionX.velocity && positions.positionY.velocity) {
      if (isCollidingXStart.current || isCollidingXEnd.current) {
        triggerHasCollided();
        dispatchLocal({
          type: 'TRIGGER_X_COLLISION',
          payload: getInverseVelocity(positions.positionX.velocity),
        });
      }

      if (isCollidingYStart.current || isCollidingYEnd.current) {
        triggerHasCollided();
        dispatchLocal({
          type: 'TRIGGER_Y_COLLISION',
          payload: getInverseVelocity(positions.positionY.velocity),
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
    positions.positionX.velocity,
    positions.positionY.velocity,
    triggerHasCollided,
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

  // init position and trigger start on load and on resize
  useEffect(() => {
    const width = playingfieldBoundingBox?.width;
    const height = playingfieldBoundingBox?.height;

    // bounding box is null on initial load
    if (!width || !height) {
      return;
    }

    const totalVelocity = 8;
    const velocityX: number =
      Math.random() >= 0.5
        ? random(1, totalVelocity - 1, true)
        : random(-1, -totalVelocity + 1, true);
    const velocityY: number =
      Math.sign(velocityX) === 1 ? totalVelocity - velocityX : totalVelocity + velocityX;

    dispatchLocal({
      type: 'TRIGGER_INITIAL_POSITION',
      payload: {
        worldSize: {
          width,
          height,
        },
        logoSize,
        velocityX,
        velocityY,
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
          width={logoSize[0]}
          height={logoSize[1]}
          currentColour={currentColor}
          isPaused={isPaused}
        />
      )}
    </Styles.PlayingFieldWrapper>
  );
};

export default PlayingField;
