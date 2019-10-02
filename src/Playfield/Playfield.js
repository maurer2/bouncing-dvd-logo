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

  const loopTimestamp = useRef(0);
  const playfieldDomElement = useRef();
  const playfieldBB = useRef();
  const isColliding = useRef(false);
  
  let changeDeltaX = 2;
  let changeDeltaY = 2;

  // svg
  const width = 150;
  const height = 138; // AR 0,92

  // set random initial position and direction
  function initPosition() {
    const { width: widthBB, height: heightBB } = playfieldBB.current;

    setPositionX(() => random(widthBB - width));
    setPositionY(() => random(heightBB - height));
  }

  function updatePosition() {
    const { width: widthBB, height: heightBB } = playfieldBB.current;
    let newChangeDeltaX = changeDeltaX;
    let newChangeDeltaY = changeDeltaY;

    let hasCollided = false;

    // const isColliding = isCollidingWithBoundaries(positionX, positionY, width, height, playfieldWidth, playfieldHeight);
    setPositionX((prevPositionX) => {
      if (isPastLeftBoundary(prevPositionX)) {
        newChangeDeltaX = Math.abs(changeDeltaX);
        hasCollided = true;
      }

      if (isPastRightBoundary(prevPositionX, width, widthBB)) {
        newChangeDeltaX = Math.abs(changeDeltaX) * -1;
        hasCollided = true;
      }

      return prevPositionX + newChangeDeltaX;
    });

    setPositionY((prevPositionY) => {
      if (isPastTopBoundary(prevPositionY)) {
        newChangeDeltaY = Math.abs(changeDeltaY);
        hasCollided = true;
      }
  
      if (isPastBottomBoundary(prevPositionY, height, heightBB)) {
        newChangeDeltaY = Math.abs(changeDeltaY) * -1;
        hasCollided = true;
      }

      return prevPositionY + newChangeDeltaY;
    });

    changeDeltaX = newChangeDeltaX;
    changeDeltaY = newChangeDeltaY;

    isColliding.current = hasCollided;
  }

  function loop() {
    updatePosition();

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
