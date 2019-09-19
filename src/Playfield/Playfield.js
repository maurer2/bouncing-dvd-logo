import React, { Component } from 'react';
import PropTypes from 'prop-types';

import random from 'lodash.random';
import styled from 'styled-components/macro';

import Logo from '../Logo/Logo';
import Sound from '../Sound/Sound';

import store from '../store';

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

  isPastLeftBoundary() {
    const { positionX } = this.state;

    return positionX <= 0;
  }

  isPastRightBoundary() {
    const { positionX, width, playfieldWidth } = this.state;

    return positionX >= (playfieldWidth - width);
  }

  isPastTopBoundary() {
    const { positionY } = this.state;

    return positionY <= 0;
  }

  isPastBottomBoundary() {
    const { positionY, height, playfieldHeight } = this.state;

    return positionY >= (playfieldHeight - height);
  }

  isCollidingWithBoundaries() {
    return this.isPastLeftBoundary() || this.isPastRightBoundary()
      || this.isPastTopBoundary() || this.isPastBottomBoundary();
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
    const { isPaused } = this.props;

    if (isPaused) {
      return;
    }

    let newChangeDeltaX = changeDeltaX;
    let newChangeDeltaY = changeDeltaY;

    if (this.isPastLeftBoundary()) {
      newChangeDeltaX = Math.abs(changeDeltaX);
    }

    if (this.isPastRightBoundary()) {
      newChangeDeltaX = Math.abs(changeDeltaX) * -1;
    }

    if (this.isPastTopBoundary()) {
      newChangeDeltaY = Math.abs(changeDeltaY);
    }

    if (this.isPastBottomBoundary()) {
      newChangeDeltaY = Math.abs(changeDeltaY) * -1;
    }

    if (this.isCollidingWithBoundaries()) {
      const upperRandomBound = 1.0 + (maxRandomness / 2 / 100);
      const lowerRandomBound = 1.0 - (maxRandomness / 2 / 100);

      newChangeDeltaX *= random(lowerRandomBound, upperRandomBound, true);
      newChangeDeltaY *= random(lowerRandomBound, upperRandomBound, true);
    }

    this.setState(previousState => ({
      positionX: Math.round(previousState.positionX + newChangeDeltaX),
      positionY: Math.round(previousState.positionY + newChangeDeltaY),
      changeDeltaX: newChangeDeltaX,
      changeDeltaY: newChangeDeltaY,
    }));
  }

  render() {
    const { positionX, positionY, width, height } = this.state;

    return (
      <store.Consumer>
        { ({ soundIsDisabled }) => (
          <PlayfieldWrapper ref={ (element) => { this.playfield = element; } }>
            <Logo
              positionX={ positionX }
              positionY={ positionY }
              width={ width }
              height={ height }
              changeColours={ this.isCollidingWithBoundaries() }
            />
            <Sound playSound={ this.isCollidingWithBoundaries() && !soundIsDisabled } />
          </PlayfieldWrapper>
        )}
      </store.Consumer>
    );
  }
}

const { bool } = PropTypes;

Playfield.propTypes = {
  isPaused: bool,
};

export default Playfield;
