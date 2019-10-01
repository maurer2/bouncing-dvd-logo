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

const isCollidingWithBoundaries = (
  positionX, positionY, width, height, playfieldWidth, playfieldHeight,
) => {
  const leftCheck = isPastLeftBoundary(positionX);
  const rightCheck = isPastRightBoundary(positionX, width, playfieldWidth);
  const topCheck = isPastTopBoundary(positionY);
  const bottomCheck = isPastBottomBoundary(positionY, height, playfieldHeight);

  return [leftCheck, rightCheck, topCheck, bottomCheck].some(entry => !!entry);
};

const PlayfieldWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

const Playfield = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [playfieldWidth, setPlayfieldWith] = useState(100);
  const [playfieldHeight, setPlayfieldHeight] = useState(100);

  const loopTimestamp = useRef(null);
  const playFieldDomElement = useRef();
  const isFirstRun = useRef(true);

  let changeDeltaX = 0;
  let changeDeltaY = 0;

  const width = 150;
  const height = 138; // AR 0,92

  // set random initial position and direction
  function initPosition() {
    if (playFieldDomElement.current === null) {
      return;
    }

    const { width: widthBB, height: heightBB } = playFieldDomElement.current.getBoundingClientRect();
    const randomChangeDeltaX = random(1) === 0 ? changeDeltaX * -1 : changeDeltaX * +1;
    const randomChangeDeltaY = random(1) === 0 ? changeDeltaY * -1 : changeDeltaY * +1;

    setPlayfieldWith(() => widthBB);
    setPlayfieldHeight(() => heightBB);
    changeDeltaX = randomChangeDeltaX;
    changeDeltaY = randomChangeDeltaY;

    setPositionX(() => random(widthBB - width));
    setPositionY(() => random(heightBB - height));
  }

  function updatePosition() {
    console.log('update');
  }

  function loop() {
    updatePosition();

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }

  function startLoop() {
    if (loopTimestamp.current !== null) {
      return;
    }

    loopTimestamp.current = window.requestAnimationFrame(loop);
  }

  function stopLoop() {
    window.cancelAnimationFrame(loopTimestamp.current);
  }

  useEffect(() => {
    initPosition();

    isFirstRun.current = false;
    startLoop();

    return () => stopLoop();
  }, []);

  const isColliding = isCollidingWithBoundaries(
    positionX,
    positionY,
    width,
    height,
    playfieldWidth,
    playfieldHeight,
  );

  return (
    <PlayfieldWrapper ref={ playFieldDomElement }>
      <Logo
        positionX={ positionX }
        positionY={ positionY }
        width={ width }
        height={ height }
        changeColours={ isColliding && !isFirstRun }
      />
      <Sound playSound={ isColliding && !isFirstRun } />
    </PlayfieldWrapper>
  );
};

const { bool } = PropTypes;

Playfield.propTypes = {
  isPaused: bool,
};

export default Playfield;
