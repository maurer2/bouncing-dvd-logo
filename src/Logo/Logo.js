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
      // transform: `translate(calc(-50% + ${this.props.positionX}vw), calc(-50% + ${this.props.positionY}vw))`,
      transform: `translate(${this.props.positionX}px, ${this.props.positionY}px)`,
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
