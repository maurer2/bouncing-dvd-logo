import React, { Component } from 'react';
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

class Playfield extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 150,
      height: 138, // AR 0,92
      changeDeltaX: 2,
      changeDeltaY: 2,
      maxRandomness: 5,
      isColliding: false,
    };

    this.loopTimestamp = 0;
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    // inital random position
    this.setPosition();
    this.startLoop();
  }

  componentWillUnmount() {
    this.stopLoop();
  }

  startLoop() {
    if (this.loopTimestamp) {
      return;
    }

    this.loopTimestamp = window.requestAnimationFrame(this.loop.bind(this));
  }

  stopLoop() {
    window.cancelAnimationFrame(this.loopTimestamp);
  }

  loop() {
    this.updatePosition();

    this.loopTimestamp = window.requestAnimationFrame(this.loop.bind(this));
  }

  setPosition() {
    if (this.playfield === undefined) {
      return;
    }

    const { width: widthBB, height: heightBB } = this.playfield.getBoundingClientRect();
    const { changeDeltaX, changeDeltaY } = this.state;

    const randomChangeDeltaX = random(1) === 0 ? changeDeltaX * -1 : changeDeltaX * +1;
    const randomChangeDeltaY = random(1) === 0 ? changeDeltaY * -1 : changeDeltaY * +1;

    this.setState(previousState => ({
      playfieldWidth: widthBB,
      playfieldHeight: heightBB,
      positionX: random(widthBB - previousState.width),
      positionY: random(heightBB - previousState.height),
      changeDeltaX: randomChangeDeltaX,
      changeDeltaY: randomChangeDeltaY,
    }));
  }

  updatePosition() {
    const { changeDeltaX, changeDeltaY, maxRandomness } = this.state;
    const { positionX, positionY, width, height, playfieldWidth, playfieldHeight } = this.state;
    const { isPaused } = this.props;

    if (isPaused) {
      return;
    }

    let newChangeDeltaX = changeDeltaX;
    let newChangeDeltaY = changeDeltaY;
    let newIsColliding = false;

    if (isPastLeftBoundary(positionX)) {
      newChangeDeltaX = Math.abs(changeDeltaX);
    }

    if (isPastRightBoundary(positionX, width, playfieldWidth)) {
      newChangeDeltaX = Math.abs(changeDeltaX) * -1;
    }

    if (isPastTopBoundary(positionY)) {
      newChangeDeltaY = Math.abs(changeDeltaY);
    }

    if (isPastBottomBoundary(positionY, height, playfieldHeight)) {
      newChangeDeltaY = Math.abs(changeDeltaY) * -1;
    }

    if (isCollidingWithBoundaries(
      positionX, positionY, width, height, playfieldWidth, playfieldHeight,
    )) {
      const upperRandomBound = 1.0 + (maxRandomness / 2 / 100);
      const lowerRandomBound = 1.0 - (maxRandomness / 2 / 100);

      newChangeDeltaX *= random(lowerRandomBound, upperRandomBound, true);
      newChangeDeltaY *= random(lowerRandomBound, upperRandomBound, true);
      newIsColliding = true;
    }

    this.setState(previousState => ({
      positionX: Math.round(previousState.positionX + newChangeDeltaX),
      positionY: Math.round(previousState.positionY + newChangeDeltaY),
      changeDeltaX: newChangeDeltaX,
      changeDeltaY: newChangeDeltaY,
      isColliding: newIsColliding,
    }));
  }

  render() {
    const { positionX, positionY, width, height, isColliding } = this.state;

    return (
      <PlayfieldWrapper ref={ (element) => { this.playfield = element; } }>
        <Logo
          positionX={ positionX }
          positionY={ positionY }
          width={ width }
          height={ height }
          changeColours={ isColliding }
        />
        <Sound playSound={ isColliding } />
      </PlayfieldWrapper>
    );
  }
}

const { bool } = PropTypes;

Playfield.propTypes = {
  isPaused: bool,
};

export default Playfield;
