import React, { Component } from 'react';
import './Playfield.css';
import Logo from '../Logo/Logo';

class Playfield extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionX: 0,
      positionY: 0,
      width: 50,
    };

    this.calculateX = this.calculateX.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const isNextFrame = (nextProps.frames !== 0 && nextProps.frames % 5 === 0);

    if (isNextFrame) {
      this.setState(previousState => ({
        positionX: previousState.positionX + 1,
        positionY: previousState.positionY + 1,
      }));
    }
  }

  calculateX() {
    const isNextFrame = (this.props.frames !== 0 && this.props.frames % 60 === 0);

    if (isNextFrame) {
      this.setState(previousState => ({
        positionX: 50,
      }));
    }

    return this.state.positionX;
  }

  render() {
    return (
      <div className="playfield">
        <Logo positionX={ this.state.positionX } positionY={ this.state.positionY } width={ this.state.width } />
      </div>
    );
  }
}

export default Playfield;
