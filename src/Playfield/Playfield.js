import React, { Component } from 'react';
import './Playfield.css';
import Logo from '../Logo/Logo';

class Playfield extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionX: 500,
      positionY: 50,
      width: 50,
      changeDelta: 50,
    };

    this.updatePosition = this.updatePosition.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const isNewFrame = (nextProps.frames === 60);

    if (isNewFrame) {
      this.updatePosition();
    }
  }

  componentDidMount() {
    const { width, height } = this.playfield.getBoundingClientRect();

    this.setState({
      playfieldWidth: width,
      playfielHeight: height,
    });
  }

  isPastRightBoundary() {
    const { positionX, width, playfieldWidth } = this.state;

    return positionX >= (playfieldWidth - width);
  }

  isPastLeftBoundary() {
    const { positionX } = this.state;

    return positionX <= 0;
  }

  updatePosition() {
    const { positionX, positionY, changeDelta } = this.state;

    let newChangeDelta = changeDelta;
    let newPosionX = positionX + newChangeDelta;

    if (this.isPastRightBoundary()) {
      newChangeDelta = changeDelta * -1;

      newPosionX = positionX + newChangeDelta;
    }

    this.setState(previousState => ({
      positionX: newPosionX,
      changeDelta: newChangeDelta,
    }));
  }

  render() {
    return (
      <div className="playfield" ref= {element => this.playfield = element }>
        <Logo positionX={ this.state.positionX } positionY={ this.state.positionY } width={ this.state.width } />
      </div>
    );
  }
}

export default Playfield;
