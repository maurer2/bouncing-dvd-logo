import React, { useEffect, useState, useRef, useContext } from 'react';

import PropTypes from 'prop-types';
import random from 'lodash.random';
import styled from 'styled-components/macro';

import store from '../store';
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

const Logo = ({ positionX, positionY, width, height, changeColours }) => {
  const { colours } = useContext(store);
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

const { number, bool } = PropTypes;

Logo.propTypes = {
  positionX: number,
  positionY: number,
  width: number,
  height: number,
  changeColours: bool,
};

export default Logo;
