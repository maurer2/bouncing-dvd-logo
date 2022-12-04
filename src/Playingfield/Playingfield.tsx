import React, { useRef, useCallback, useLayoutEffect, useReducer } from 'react';
import type { FC, ReactElement, Reducer } from 'react';
import { random } from 'lodash-es';
import { produce } from 'immer';

import Logo from '../Logo/Logo';
import useCollisionDetection from '../Hooks/useCollisionDetection';

import * as Styles from './Playingfield.styles';
import type * as Types from './Playingfield.types';

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

const PlayingField: FC<Readonly<Types.PlayingfieldProps>> = ({
  isPaused,
  triggerCollision,
  currentColor,
}): ReactElement => {
  const [positions, dispatchLocal] = useReducer<Reducer<Types.ReducerState, any>>(
    produce((state, action) => {
      // todo union types
      switch (action.type) {
        case 'TRIGGER_NEXT_POSITION': {
          const newDraft = state;

          newDraft.positionX.value += state.positionX.velocity;
          newDraft.positionY.value += state.positionY.velocity;
          break;
        }
        case 'TRIGGER_X_COLLISION': {
          const newDraft = state;

          newDraft.positionX.value += state.positionX.velocity * -1;
          newDraft.positionX.velocity *= -1;
          break;
        }
        case 'TRIGGER_Y_COLLISION': {
          const newDraft = state;

          newDraft.positionY.value += state.positionY.velocity * -1;
          newDraft.positionY.velocity *= -1;
          break;
        }
        default: {
          break;
        }
      }
    }),
    {
      positionX: {
        value: 50,
        velocity: 8,
        randomness: 0,
      },
      positionY: {
        value: 50,
        velocity: 2,
        randomness: 0,
      },
    },
  );

  const loopTimestamp = useRef(0);
  const playingfieldBB = useRef<DOMRect | null>(null);

  const playingfieldDomElement = useCallback((element: HTMLDivElement) => {
    playingfieldBB.current = element?.getBoundingClientRect();
  }, []);

  const [isCollidingXStart, isCollidingXEnd] = useCollisionDetection(
    positions.positionX.value,
    logoDimensions[0],
    playingfieldBB.current?.width,
  );
  const [isCollidingYStart, isCollidingYEnd] = useCollisionDetection(
    positions.positionY.value,
    logoDimensions[1],
    playingfieldBB.current?.height,
  );
  const loop = useCallback(() => {
    if (!isPaused) {
      if (isCollidingXStart.current || isCollidingXEnd.current) {
        dispatchLocal({
          type: 'TRIGGER_X_COLLISION',
        });
        triggerCollision();
      }

      if (isCollidingYStart.current || isCollidingYEnd.current) {
        dispatchLocal({
          type: 'TRIGGER_Y_COLLISION',
        });
        triggerCollision();
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
    triggerCollision,
  ]);

  useLayoutEffect(() => {
    loopTimestamp.current = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(loopTimestamp.current);
    };
  }, [loop]);

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
