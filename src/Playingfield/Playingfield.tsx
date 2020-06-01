import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import random from 'lodash.random';

import Logo from '../Logo/Logo';
import Sound from '../Sound/Sound';
import Controls from '../Controls/Controls';

import * as Styles from './Playingfield.styles';

const isPastStartBoundary = (position) => (position <= 0);

const isPastEndBoundary = (position, objectSize, playfieldSize) => {
  const maxPositionStillInside = (playfieldSize - objectSize);

  return position >= maxPositionStillInside;
};

/*
const isCollidingWithBoundaries = (
  positionX, positionY, width, height, playfieldWidth, playfieldHeight,
) => {
  const leftCheck = isPastStartBoundary(positionX);
  const rightCheck = isPastEndBoundary(positionX, width, playfieldWidth);
  const topCheck = isPastStartBoundary(positionY);
  const bottomCheck = isPastEndBoundary(positionY, height, playfieldHeight);

  return [leftCheck, rightCheck, topCheck, bottomCheck].some(entry => !!entry);
};
*/

const PlayingField = (props) => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const loopTimestamp = useRef(0);
  const changeDeltaX = useRef(2); // velocity x
  const changeDeltaY = useRef(2); // velocity y

  const playfieldDomElement = useRef();
  const playfieldBB = useRef();

  const isColliding = useRef(false);
  const isPaused = useRef(false);
  const isInit = useRef(false);
  const maxRandomness = 6; // max value of deviation from correct reflection on collision

  // svg
  const width = 150;
  const height = 138; // AR 0,92

  // set random initial position and direction
  function initPosition() {
    // @ts-ignore
    const { width: widthBB, height: heightBB } = playfieldBB.current;

    setPositionX(() => random(widthBB - width));
    setPositionY(() => random(heightBB - height));

    // initial direction
    changeDeltaX.current = random(1) === 0 ? changeDeltaX.current * -1 : changeDeltaX.current * +1;
    changeDeltaY.current = random(1) === 0 ? changeDeltaY.current * -1 : changeDeltaY.current * +1;
    isInit.current = true;
  }

  function updatePosition() {
    // @ts-ignore
    const { width: widthBB, height: heightBB } = playfieldBB.current;

    const upperRandomBound = 1.0 + ((maxRandomness / 2) / 100);
    const lowerRandomBound = 1.0 - ((maxRandomness / 2) / 100);

    let newChangeDeltaX = changeDeltaX.current * random(lowerRandomBound, upperRandomBound, true);
    let newChangeDeltaY = changeDeltaY.current * random(lowerRandomBound, upperRandomBound, true);
    let hasCollided = false;

    setPositionX((prevPositionX) => {
      if (isPastStartBoundary(prevPositionX)) {
        newChangeDeltaX = Math.abs(changeDeltaX.current);
        hasCollided = true;
      }

      if (isPastEndBoundary(prevPositionX, width, widthBB)) {
        newChangeDeltaX = Math.abs(changeDeltaX.current) * -1;
        hasCollided = true;
      }

      return Math.round(prevPositionX + newChangeDeltaX);
    });

    setPositionY((prevPositionY) => {
      if (isPastStartBoundary(prevPositionY)) {
        newChangeDeltaY = Math.abs(changeDeltaY.current);
        hasCollided = true;
      }

      if (isPastEndBoundary(prevPositionY, height, heightBB)) {
        newChangeDeltaY = Math.abs(changeDeltaY.current) * -1;
        hasCollided = true;
      }

      return Math.round(prevPositionY + newChangeDeltaY);
    });

    if (hasCollided) {
      changeDeltaX.current = newChangeDeltaX;
      changeDeltaY.current = newChangeDeltaY;
    }

    isColliding.current = hasCollided;
  }

  const loop = useCallback(() => {
    if (!isPaused.current) {
      updatePosition();
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, []);

  const startLoop = useCallback(() => {
    if (loopTimestamp.current !== 0) {
      return;
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }, [loop]);

  function stopLoop() {
    window.cancelAnimationFrame(loopTimestamp.current);
  }

  useEffect(() => {
    // @ts-ignore
    playfieldBB.current = playfieldDomElement.current.getBoundingClientRect();

    initPosition();
    startLoop();

    return () => stopLoop();
  }, [startLoop]);

  useEffect(() => {
    const currentPlayState = props.isPaused;

    isPaused.current = currentPlayState;
  }, [props.isPaused]);

  return (
    <Styles.PlayingFieldWrapper ref={ playfieldDomElement }>
      {isInit.current && (
        <>
          <Logo
            positionX={ positionX }
            positionY={ positionY }
            width={ width }
            height={ height }
            changeColours={ isColliding.current }
            isPaused={ props.isPaused }
          />
          <Controls />
          <Sound playSound={ isColliding.current } />
        </>
      )}
    </Styles.PlayingFieldWrapper>
  );
};

const { bool } = PropTypes;

PlayingField.propTypes = {
  isPaused: bool,
};

export default PlayingField;