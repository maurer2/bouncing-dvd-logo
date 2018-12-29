import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Playfield.css';
import Logo from '../Logo/Logo';

class Playfield extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionX: 720,
      positionY: 50,
      width: 50,
      height: 50,
      changeDeltaX: 2,
      changeDeltaY: 2,
    };

    this.updatePosition = this.updatePosition.bind(this);
  }

  /* eslint-disable camelcase */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.frames !== this.props.frames) {
      this.updatePosition();
    }
  }

  componentDidMount() {
    const { width, height } = this.playfield.getBoundingClientRect();

    this.setState({
      playfieldWidth: width,
      playfieldHeight: height,
    });
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

  updatePosition() {
    const {
      positionX, positionY, changeDeltaX, changeDeltaY,
    } = this.state;

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

    const newPosionX = positionX + newChangeDeltaX;
    const newPosionY = positionY + newChangeDeltaY;

    this.setState({
      positionX: newPosionX,
      positionY: newPosionY,
      changeDeltaX: newChangeDeltaX,
      changeDeltaY: newChangeDeltaY,
    });
  }

  render() {
    return (
      <div className="playfield" ref={ (element) => { this.playfield = element; } }>
        <Logo positionX={ this.state.positionX } positionY={ this.state.positionY }
          width={ this.state.width } />
      </div>
    );
  }
}

Playfield.propTypes = {
  frames: PropTypes.number,
};

export default Playfield;
