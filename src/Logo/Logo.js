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

    this.getStyle = this.getStyle.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.changeColors && !prevProps.changeColors) {
      this.cycleColor();
    }


    if (this.props.positionX !== prevProps.positionX) {
      // console.log(this.props.positionX, prevProps.positionX);
      // console.log(this.logo);
      // this.moveLogo();
    }
  }

  shouldComponentUpdate() {
    this.moveLogo();

    return false;
  }

  getStyle() {
    return {
      // transform: `translateZ(0) translate(${this.props.positionX}px, ${this.props.positionY}px)`,
      width: `${this.props.width}px`,
      color: `${this.state.color}`,
    };
  }

  moveLogo() {
    console.log('wfew');

    this.logo.animate(
      [
        { transform: 'rotate(0)' },
        { transform: 'rotate(360deg)' },
      ],
      3000,
    );
  }

  cycleColor() {
    const newColors = this.props.colors.filter(color => color !== this.state.color);
    const randomColorIndex = random(newColors.length - 1);

    this.setState({ color: newColors[randomColorIndex] });
  }

  render() {
    return (
      <div className="logo" style={ this.getStyle() } ref={ (element) => { this.logo = element; } }>
        <CatSVG className="logo-inner" />
      </div>
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
