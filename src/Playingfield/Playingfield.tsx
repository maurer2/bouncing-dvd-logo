import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import type { FC, ReactElement } from 'react';
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
  const [positionX, setPositionX] = useState(50);
  const [positionY, setPositionY] = useState(50);
  const isPaused = useSelector(getPlayState)
  const dispatch: Dispatch = useDispatch();

  const loopTimestamp = useRef(0);
  const playingfieldBB = useRef<DOMRect>({} as DOMRect);

  const isColliding = useRef(false);
  const isCollidingX = useRef(false);
  const isCollidingY = useRef(false);

  const playingfieldDomElement = useCallback((element: HTMLElement) => {
    if (!element) {
      return;
    }

    playingfieldBB.current = element.getBoundingClientRect();
  }, []);

  const [isCollidingXStart, isCollidingXEnd] = useCollisionDetection(
    positionX,
    logoObject[0],
    playingfieldBB.current.width,
  );
  const [isCollidingYStart, isCollidingYEnd] = useCollisionDetection(
    positionY,
    logoObject[1],
    playingfieldBB.current.height,
  );
  const loop = useCallback(() => {
    if (!isPaused) {
      setPositionX((prevPositionX: number) => Math.round(prevPositionX + 1));
      setPositionY((prevPositionY: number) => Math.round(prevPositionY + 1));

      console.log(isCollidingXStart, isCollidingXEnd);
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [isPaused]);

  useLayoutEffect(() => {
    loopTimestamp.current = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(loopTimestamp.current);
    };
  }, [loop]);

  function handleClick() {
    dispatch(pauseGame([positionX, positionY]));
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
            positionX={positionX}
            positionY={positionY}
            width={logoObject[0]}
            height={logoObject[1]}
            changeColours={isColliding.current}
            isPaused={false}
          />
          <Sound shouldTriggerSound={isColliding.current} />
        </>
    </Styles.PlayingFieldWrapper>
  );
};

const { bool } = PropTypes;

PlayingField.propTypes = { };

export default PlayingField;
