import React, { Component } from 'react';
import PropTypes from 'prop-types';
import random from 'lodash.random';
import './Logo.css';
import { ReactComponent as CatSVG } from './cat.svg';

class Logo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: this.props.colors[0],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.changeColors && !prevProps.changeColors) {
      this.cycleColor();
    }
  }

  getStyle() {
    return {
      transform: `translateZ(0) translate(${this.props.positionX}px, ${this.props.positionY}px)`,
      width: `${this.props.width}px`,
      color: `${this.state.color}`,
    };
  }

  cycleColor() {
    const newColors = this.props.colors.filter(color => color !== this.state.color);
    const randomColorIndex = random(newColors.length - 1);

    this.setState({ color: newColors[randomColorIndex] });
  }

  render() {
    return (
      <CatSVG className="logo" style={ this.getStyle() } />
    );
  }
}

Logo.propTypes = {
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  width: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  changeColors: PropTypes.bool,
};

export default Logo;
