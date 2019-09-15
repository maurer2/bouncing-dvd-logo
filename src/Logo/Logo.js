import React, { useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';
import random from 'lodash.random';
import styled from 'styled-components/macro';

import { ReactComponent as CatLogo } from './cat.svg';

const LogoElement = styled.div.attrs(props => ({
  style: {
    transform: `translate(${Math.round(props.positionX)}px, ${Math.round(props.positionY)}px)`,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => `${props.widthValue}px`};
  height: ${props => `${props.heightValue}px`};
  color: ${props => `${props.colourValue}`};
  will-change: transform;
`;

const Logo = ({ positionX, positionY, width, height, colours, changeColours }) => {
  const [colour, setColour] = useState(colours[0]);
  const prevChangeColours = useRef(false);

  const getRandomColor = (prevColour) => {
    const newColours = colours.filter(colourEntry => colourEntry !== prevColour);
    const randomColourIndex = random(newColours.length - 1);
    const newColour = newColours[randomColourIndex];

    return newColour;
  };

  useEffect(() => {
    if (changeColours && changeColours !== prevChangeColours.current) {
      setColour(getRandomColor);
    }

    prevChangeColours.current = changeColours;
  }, [changeColours, getRandomColor]);

  return (
    <LogoElement
      positionX={ positionX }
      positionY={ positionY }
      widthValue={ width }
      heightValue={ height }
      colourValue= { colour }
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
  colours: PropTypes.arrayOf(PropTypes.string),
  changeColours: PropTypes.bool,
};

export default Logo;
