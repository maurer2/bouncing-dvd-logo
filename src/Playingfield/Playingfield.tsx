import React, { useRef, useCallback, useLayoutEffect, useReducer } from 'react';
import type { FC, ReactElement, Reducer } from 'react';
import PropTypes, { func } from 'prop-types';
import { random } from 'lodash-es';
import { produce } from 'immer';

import Logo from '../Logo/Logo';
import Sound from '../Sound/Sound';
import useCollisionDetection from '../Hooks/useCollisionDetection';

import * as Styles from './Playingfield.styles';
import type * as Types from './Playingfield.types';

const logoObject: Types.LogoObject = [150, 138];

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

const PlayingField: FC<Readonly<Types.PlayingfieldProps>> = ({ isPaused, triggerCollision }): ReturnType<FC> => {
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
  const playingfieldBB = useRef<DOMRect>({} as DOMRect);

  const playingfieldDomElement = useCallback((element: HTMLElement) => {
    if (!element) {
      return;
    }

    playingfieldBB.current = element.getBoundingClientRect();
  }, []);

  const [isCollidingXStart, isCollidingXEnd] = useCollisionDetection(
    positions.positionX.value,
    logoObject[0],
    playingfieldBB.current.width,
  );
  const [isCollidingYStart, isCollidingYEnd] = useCollisionDetection(
    positions.positionY.value,
    logoObject[1],
    playingfieldBB.current.height,
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
  }, [isPaused, isCollidingXStart, isCollidingYStart, isCollidingXEnd, isCollidingYEnd]);

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
      <>
        <Logo
          positionX={Math.round(positions.positionX.value)}
          positionY={Math.round(positions.positionY.value)}
          width={logoObject[0]}
          height={logoObject[1]}
          changeColours={
            isCollidingXStart.current ||
            isCollidingXEnd.current ||
            isCollidingYStart.current ||
            isCollidingYEnd.current
          }
          isPaused={isPaused}
        />
        {/* todo: move to parent */}
        <Sound
          shouldTriggerSound={
            isCollidingXStart.current ||
            isCollidingXEnd.current ||
            isCollidingYStart.current ||
            isCollidingYEnd.current
          }
        />
      </>
    </Styles.PlayingFieldWrapper>
  );
};

const { bool } = PropTypes;

PlayingField.propTypes = {};

export default PlayingField;
