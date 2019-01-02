import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Playfield.css';
import random from 'lodash.random';
import Logo from '../Logo/Logo';
import Sound from '../Sound/Sound';

class Playfield extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 150,
      height: 150,
      changeDeltaX: 2,
      changeDeltaY: 2,
      colors: ['white', 'red', 'green', 'blue', 'yellow', 'purple', 'gray'],
      soundIsDisabled: true,
    };

    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.frames !== this.props.frames) {
      this.updatePosition();
    }
  }

  componentDidMount() {
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

  updatePosition() {
    const { changeDeltaX, changeDeltaY } = this.state;

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

    this.setState(previousState => ({
      positionX: previousState.positionX + newChangeDeltaX,
      positionY: previousState.positionY + newChangeDeltaY,
      changeDeltaX: newChangeDeltaX,
      changeDeltaY: newChangeDeltaY,
    }));
  }

  render() {
    return (
      <div className="playfield" ref={ (element) => { this.playfield = element; } }>
        <Logo positionX={ this.state.positionX } positionY={ this.state.positionY }
          width={ this.state.width } colors={ this.state.colors }
          changeColors={ this.isCollidingWithBoundaries() } />
        <Sound playSound={ this.isCollidingWithBoundaries() && !this.state.soundIsDisabled } />
      </div>
    );
  }
}

Playfield.propTypes = {
  frames: PropTypes.number,
};

export default Playfield;
