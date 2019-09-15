import React, { Component, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import random from 'lodash.random';
import styled from 'styled-components/macro';

import Logo from '../Logo/Logo';
import Sound from '../Sound/Sound';

const PlayfieldWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  pointer-events: none;
`;

const Playfield = ({ isPaused }) => {
  const [positionX, setPositionX] = useState(50);
  const [positionY, setPositionY] = useState(50);
  const [playfieldWidth, setPlayfieldWidth] = useState(0);
  const [playfieldHeight, setPlayfieldHeight] = useState(0);
  const [changeDeltaX, setChangeDeltaX] = useState(0);
  const [changeDeltaY, setChangeDeltaY] = useState(0);
  const playFieldDomElement = useRef(null); // dom element

  const width = 150;
  const height = 138; // AR 0,92
  const colours = ['white', 'red', 'blue', 'yellow', 'fuchsia', 'lime'];
  const soundIsDisabled = true;
  const maxRandomness = 5;

  const isPastLeftBoundary = () => (positionX <= 0);

  const isPastRightBoundary = () => {
    return positionX >= (playfieldWidth - width);
  };

  const isPastTopBoundary = () => {
    return positionY <= 0;
  };

  const isPastBottomBoundary = () => {
    return positionY >= (playfieldHeight - height);
  };

  const isCollidingWithBoundaries = () => {
    return isPastLeftBoundary() || isPastRightBoundary() || isPastTopBoundary() || isPastBottomBoundary();
  };

  const setPosition = () => {
    if (playFieldDomElement.current === null) {
      return;
    }

    const { width: widthBB, height: heightBB } = playFieldDomElement.current.getBoundingClientRect();

    const randomChangeDeltaX = random(1) === 0 ? changeDeltaX * -1 : changeDeltaX * +1;
    const randomChangeDeltaY = random(1) === 0 ? changeDeltaY * -1 : changeDeltaY * +1;

    setPlayfieldWidth(widthBB);
    setPlayfieldHeight(heightBB);
    setPositionX(random(widthBB - width));
    setPositionY(random(heightBB - height));
    setChangeDeltaX(randomChangeDeltaX);
    setChangeDeltaY(randomChangeDeltaY);
  };

  const updatePosition = () => {
    if (isPaused) {
      return;
    }

    let newChangeDeltaX = changeDeltaX;
    let newChangeDeltaY = changeDeltaY;

    if (isPastLeftBoundary()) {
      newChangeDeltaX = Math.abs(changeDeltaX);
    }

    if (isPastRightBoundary()) {
      newChangeDeltaX = Math.abs(changeDeltaX) * -1;
    }

    if (isPastTopBoundary()) {
      newChangeDeltaY = Math.abs(changeDeltaY);
    }

    if (isPastBottomBoundary()) {
      newChangeDeltaY = Math.abs(changeDeltaY) * -1;
    }

    if (isCollidingWithBoundaries()) {
      const upperRandomBound = 1.0 + (maxRandomness / 2 / 100);
      const lowerRandomBound = 1.0 - (maxRandomness / 2 / 100);

      newChangeDeltaX *= random(lowerRandomBound, upperRandomBound, true);
      newChangeDeltaY *= random(lowerRandomBound, upperRandomBound, true);
    }

    setPositionX((prevPositionX) => {
      return prevPositionX + newChangeDeltaX;
    });
    setPositionX((prevPositionY) => {
      return prevPositionY + newChangeDeltaX;
    });
    setChangeDeltaX(newChangeDeltaX);
    setChangeDeltaX(newChangeDeltaY);
  };

  // start/stop gameloop
  useEffect(() => {
    setPosition();

    setTimeout(() => {
      updatePosition();
    }, 2000);
  }, []);

  return (
    <PlayfieldWrapper ref={ (element) => { playFieldDomElement.current = element; } }>
      <Logo
        positionX={ positionX }
        positionY={ positionY }
        width={ width }
        height={ height }
        colours={ colours }
        changeColours={ isCollidingWithBoundaries() }
      />
      <Sound playSound={ isCollidingWithBoundaries() && !soundIsDisabled } />
    </PlayfieldWrapper>
  );
};

Playfield.propTypes = {
  isPaused: PropTypes.bool,
};

export default Playfield;
