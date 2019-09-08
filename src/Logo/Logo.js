import React, { Component, useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';
import random from 'lodash.random';
import styled from 'styled-components/macro';

import { ReactComponent as CatLogo } from './cat.svg';

const LogoElement = styled.div.attrs(props => ({
  style: { transform: `translate(${Math.round(props.positionX)}px, ${Math.round(props.positionY)}px)` },
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => `${props.widthValue}px`};
  height: ${props => `${props.heightValue}px`};
  will-change: transform;
  color: ${props => `${props.colorValue}`};
`;

const Logo = ({ positionX, positionY, width, height, colors, changeColors }) => {
  const [color, setColor] = useState(colors[0]);

  useEffect(() => {
    if (!changeColors) {
      return;
    }

    cycleColor();
  }, [changeColors]);

  function cycleColor() {
    const newColors = colors.filter(colorEntry => colorEntry !== color);
    const randomColorIndex = random(newColors.length - 1);
    const newColor = newColors[randomColorIndex];

    setColor(newColor);
  }

  return (
    <LogoElement
      positionX={ positionX }
      positionY={ positionY }
      widthValue={ width }
      heightValue={ height }
      colorValue= { color }
    >
      <CatLogo />
    </LogoElement>
  );
};

Logo.propTypes = {
  positionX: PropTypes.number,
  positionY: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  colors: PropTypes.arrayOf(PropTypes.string),
  changeColors: PropTypes.bool,
};

export default Logo;
