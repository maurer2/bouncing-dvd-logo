import React, { Component } from 'react';

import PropTypes from 'prop-types';
import random from 'lodash.random';
import styled from 'styled-components/macro';

// import './Logo.css';

import { ReactComponent as CatLogo } from './cat.svg';

const LogoElement = styled.div.attrs({
  style: props => ({
    transform: `translate(${Math.round(props.positionX)}px, ${Math.round(props.positionY)}px)`,
  }),
})`
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
  width: ${props => `${props.widthValue}px`};
  height: ${props => `${props.heightValue}px`};
  color: ${props => `${props.colorValue}`};
`;

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

  cycleColor() {
    const newColors = this.props.colors.filter(color => color !== this.state.color);
    const randomColorIndex = random(newColors.length - 1);

    this.setState({ color: newColors[randomColorIndex] });
  }

  render() {
    return (
      <LogoElement positionX={ this.props.positionX } positionY={ this.props.positionY }
        widthValue={ this.props.width } heightValue={ this.props.height }
        colorValue= { this.state.color }>
          <CatLogo />
      </LogoElement>
    );
  }
}

Logo.propTypes = {
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  changeColors: PropTypes.bool,
};

export default Logo;
