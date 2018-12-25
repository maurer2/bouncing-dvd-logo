import React, { Component } from 'react';
import './Logo.css';
import { ReactComponent as CatSVG } from './cat.svg';

class Logo extends Component {
  render() {
    return (
      <CatSVG className="logo" />
    );
  }
}

export default Logo;
