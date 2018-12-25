import React, { Component } from 'react';
import './Logo.css';
import { ReactComponent as CatSVG } from './cat.svg';

class Logo extends Component {
  constructor(props) {
    super(props);

    this.getStyle = this.getStyle.bind(this);
  }

  getStyle() {
    return {
      transform: `
        translateX(calc(-50% + ${this.props.positionX}vw))
        translateY(calc(-50% + ${this.props.positionY}vh))`,
      width: `${this.props.width}px`
    };
  }

  render() {
    return (
      <CatSVG className="logo" style= { this.getStyle() } />
    );
  }
}

export default Logo;
