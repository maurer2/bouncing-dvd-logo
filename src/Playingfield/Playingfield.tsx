import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react';
import type { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { random } from 'lodash-es';

import Logo from '../Logo/Logo';
import Sound from '../Sound/Sound';
import useChangeDelta from '../Hooks/useChangeDelta';
import useCollisionDetection from '../Hooks/useCollisionDetection';

import * as Styles from './Playingfield.styles';
import type * as Types from './Playingfield.types';

const logoObject: Types.LogoObject = [150, 138];

const PlayingField: FC<Readonly<Types.PlayingfieldProps>> = ({ isPaused }): ReactElement => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const loopTimestamp = useRef(0);
  const playingfieldBB = useRef<DOMRect>({} as DOMRect);

  const isColliding = useRef(false);
  const isCollidingX = useRef(false);
  const isCollidingY = useRef(false);
  const isPausedPrevious = useRef(false);
  const isInit = useRef(false);

  const playingfieldDomRefCB = useCallback((element: HTMLElement) => {
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
  const [changeX] = useChangeDelta(3, isCollidingX.current);
  const [changeY] = useChangeDelta(3, isCollidingY.current);

  // set random initial position and direction
  const initPosition = useCallback(() => {
    if (isInit.current) {
      return;
    }

    const { width, height } = playingfieldBB.current;

    setPositionX(() => random(width - logoObject[0]));
    setPositionY(() => random(height - logoObject[1]));

    isInit.current = true;
  }, []);

  const loop = useCallback(() => {
    if (!isPausedPrevious.current) {
      setPositionX((prevPositionX: number) => Math.round(prevPositionX + changeX.current));
      setPositionY((prevPositionY: number) => Math.round(prevPositionY + changeY.current));

      isCollidingX.current = isCollidingXStart.current || isCollidingXEnd.current;
      isCollidingY.current = isCollidingYStart.current || isCollidingYEnd.current;
      isColliding.current = isCollidingX.current || isCollidingY.current;
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [isCollidingXStart, isCollidingXEnd, isCollidingYStart, isCollidingYEnd, changeX, changeY]);

  const startLoop = useCallback(() => {
    if (loopTimestamp.current !== 0) {
      return;
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [loop]);

  function stopLoop(): void {
    window.cancelAnimationFrame(loopTimestamp.current);
  }

  useLayoutEffect(() => {
    initPosition();
    startLoop();

    return () => stopLoop();
  }, [initPosition, startLoop]);

  useEffect(() => {
    isPausedPrevious.current = isPaused;
  }, [isPaused]);

  return (
    <Styles.PlayingFieldWrapper
      ref={playingfieldDomRefCB}
      data-testid="playfingfield"
      data-status={isPaused ? 'inactive' : 'active'}
    >
      {isInit.current && (
        <>
          <Logo
            positionX={positionX}
            positionY={positionY}
            width={logoObject[0]}
            height={logoObject[1]}
            changeColours={isColliding.current}
            isPaused={isPaused}
          />
          <Sound shouldTriggerSound={isColliding.current} />
        </>
      )}
    </Styles.PlayingFieldWrapper>
  );
};

const { bool } = PropTypes;

PlayingField.propTypes = { isPaused: bool.isRequired };

export default PlayingField;
