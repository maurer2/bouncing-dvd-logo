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
  }

  render() {
    return (
      <div className="playfield">
        <Logo positionX={ this.state.positionX } positionY={ this.state.positionY } width={ this.state.width} />
      </div>
    );
  }
}

export default Playfield;
