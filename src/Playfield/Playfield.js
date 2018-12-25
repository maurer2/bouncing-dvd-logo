import React, { Component } from 'react';
import './Playfield.css';
import Logo from '../Logo/Logo';

class Playfield extends Component {
  render() {
    return (
      <div className="playfield">
        <Logo className="logo" />
      </div>
    );
  }
}

export default Playfield;
