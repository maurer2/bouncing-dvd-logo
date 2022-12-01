import React, { useEffect, useState, useRef, useCallback, useLayoutEffect, useReducer } from 'react';
import type { FC, ReactElement, Reducer } from 'react';
import PropTypes, { func } from 'prop-types';
import { random } from 'lodash-es';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../Logo/Logo';
import Sound from '../Sound/Sound';
import useChangeDelta from '../Hooks/useChangeDelta';
import useCollisionDetection from '../Hooks/useCollisionDetection';
import { getSoundState, getPlayState } from '../Store2/selectors'
import type { Dispatch } from '../Store2/types';
import { pauseGame } from '../Store2/actionCreators';

import * as Styles from './Playingfield.styles';
import type * as Types from './Playingfield.types';

const logoObject: Types.LogoObject = [150, 138];

const PlayingField: FC<Readonly<Types.PlayingfieldProps>> = ({ triggerCollision }): ReactElement => {
  const [positions, dispatchLocal] = useReducer<Reducer<Types.ReducerState, any>>((state, action) => {
    // todo union types
    switch (action.type) {
      case 'TRIGGER_NEXT_POSITION': {
        const newPositions = {
          ...state,
          positionX: {
            ...state.positionX,
            value: state.positionX.value + state.positionX.velocity,
          },
          positionY: {
            ...state.positionY,
            value: state.positionY.value + state.positionY.velocity,
          }
        }
        return newPositions;
      }
      case 'TRIGGER_X_COLLISION': {
        const newPositions = {
          ...state,
          positionX: {
            ...state.positionX,
            value: state.positionX.value + (state.positionX.velocity * -1),
            velocity: state.positionX.velocity * -1,
          },
        }
        return newPositions;
      }
      case 'TRIGGER_Y_COLLISION': {
        const newPositions = {
          ...state,
          positionY: {
            ...state.positionY,
            value: state.positionY.value + (state.positionY.velocity * -1),
            velocity: state.positionY.velocity * -1,
          },
        }
        return newPositions
      }
      default:
        return state;
    }
  }, {
    positionX: {
      value: 50,
      velocity: 4,
    },
    positionY: {
      value: 50,
      velocity: 2,
    }
  });

  const loopTimestamp = useRef(0);
  const playingfieldBB = useRef<DOMRect>({} as DOMRect);

  const isPaused = useSelector(getPlayState);
  const dispatch: Dispatch = useDispatch();

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
      }

      if (isCollidingYStart.current || isCollidingYEnd.current) {
        dispatchLocal({
          type: 'TRIGGER_Y_COLLISION',
        });
      }

      if (!isCollidingXStart.current && !isCollidingXEnd.current && !isCollidingYStart.current && !isCollidingYEnd.current) {
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

  function handleClick() {
    dispatch(pauseGame([positions.positionX.value, positions.positionY.value]));
  }

  return (
    <Styles.PlayingFieldWrapper
      ref={playingfieldDomElement}
      data-testid="playfingfield"
      // eslint-disable-next-line react/jsx-no-bind
      onClick={handleClick}
    >
        <>
          <Logo
            positionX={Math.round(positions.positionX.value)}
            positionY={Math.round(positions.positionY.value)}
            width={logoObject[0]}
            height={logoObject[1]}
            // changeColours={isColliding.current}
            changeColours={false}
            isPaused={false}
          />
          {/* <Sound shouldTriggerSound={isColliding.current} /> */}
          <Sound shouldTriggerSound={false} />
        </>
    </Styles.PlayingFieldWrapper>
  );
};

const { bool } = PropTypes;

PlayingField.propTypes = { };

export default PlayingField;
