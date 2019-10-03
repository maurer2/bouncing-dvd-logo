import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import random from 'lodash.random';
import styled from 'styled-components/macro';

import Logo from '../Logo/Logo';
import Sound from '../Sound/Sound';

const isPastLeftBoundary = positionX => positionX <= 0;

const isPastRightBoundary = (positionX, width, playfieldWidth) => {
  const maxPositionStillInside = (playfieldWidth - width);

  return positionX >= maxPositionStillInside;
};

const isPastTopBoundary = positionY => positionY <= 0;

const isPastBottomBoundary = (positionY, height, playfieldHeight) => {
  const maxPositionStillInside = (playfieldHeight - height);

  return positionY >= maxPositionStillInside;
};

/*
const isCollidingWithBoundaries = (
  positionX, positionY, width, height, playfieldWidth, playfieldHeight,
) => {
  const leftCheck = isPastLeftBoundary(positionX);
  const rightCheck = isPastRightBoundary(positionX, width, playfieldWidth);
  const topCheck = isPastTopBoundary(positionY);
  const bottomCheck = isPastBottomBoundary(positionY, height, playfieldHeight);

  return [leftCheck, rightCheck, topCheck, bottomCheck].some(entry => !!entry);
};
*/

const PlayfieldWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

const Playfield = (props) => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  const loopTimestamp = useRef(0);
  const changeDeltaX = useRef(2);
  const changeDeltaY = useRef(2);

  const playfieldDomElement = useRef();
  const playfieldBB = useRef();

  const isColliding = useRef(false);
  const isPaused = useRef(false);
  const maxRandomness = 6; // max value of deviation from correct reflection on collision

  // svg
  const width = 150;
  const height = 138; // AR 0,92

  // set random initial position and direction
  function initPosition() {
    const { width: widthBB, height: heightBB } = playfieldBB.current;

    setPositionX(() => random(widthBB - width));
    setPositionY(() => random(heightBB - height));

    // initial direction
    changeDeltaX.current = random(1) === 0 ? changeDeltaX.current * -1 : changeDeltaX.current * +1;
    changeDeltaY.current = random(1) === 0 ? changeDeltaY.current * -1 : changeDeltaY.current * +1;
  }

  function updatePosition() {
    const { width: widthBB, height: heightBB } = playfieldBB.current;

    const upperRandomBound = 1.0 + ((maxRandomness / 2) / 100);
    const lowerRandomBound = 1.0 - ((maxRandomness / 2) / 100);

    let newChangeDeltaX = changeDeltaX.current * random(lowerRandomBound, upperRandomBound, true);
    let newChangeDeltaY = changeDeltaY.current * random(lowerRandomBound, upperRandomBound, true);
    let hasCollided = false;

    setPositionX((prevPositionX) => {
      if (isPastLeftBoundary(prevPositionX)) {
        newChangeDeltaX = Math.abs(changeDeltaX.current);
        hasCollided = true;
      }

      if (isPastRightBoundary(prevPositionX, width, widthBB)) {
        newChangeDeltaX = Math.abs(changeDeltaX.current) * -1;
        hasCollided = true;
      }

      return Math.round(prevPositionX + newChangeDeltaX);
    });

    setPositionY((prevPositionY) => {
      if (isPastTopBoundary(prevPositionY)) {
        newChangeDeltaY = Math.abs(changeDeltaY.current);
        hasCollided = true;
      }

      if (isPastBottomBoundary(prevPositionY, height, heightBB)) {
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

  function loop() {
    if (!(isPaused.current)) {
      updatePosition();
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }

  function startLoop() {
    if (loopTimestamp.current !== 0) {
      return;
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }

  function stopLoop() {
    window.cancelAnimationFrame(loopTimestamp.current);
  }

  useEffect(() => {
    playfieldBB.current = playfieldDomElement.current.getBoundingClientRect();

    initPosition();
    startLoop();

    return () => stopLoop();
  }, []);

  useEffect(() => {
    isPaused.current = props.isPaused;
  }, [props.isPaused]);

  useEffect(() => {
    if (!isColliding.current) {
      return;
    }

    console.log('colliding');
  }, [isColliding.current]);

  return (
    <PlayfieldWrapper ref={ playfieldDomElement }>
      <Logo
        positionX={ positionX }
        positionY={ positionY }
        width={ width }
        height={ height }
        changeColours={ isColliding.current }
      />
      <Sound playSound={ isColliding.current } />
    </PlayfieldWrapper>
  );
};

const { bool } = PropTypes;

Playfield.propTypes = {
  isPaused: bool,
};

export default Playfield;
