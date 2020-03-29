import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';

import PropTypes from 'prop-types';
import random from 'lodash.random';
import * as Styles from './Logo.styles';

import store from '../store';
import { ReactComponent as CatLogo } from './cat.svg';

const Logo = ({ positionX, positionY, width, height, changeColours }) => {
  const { colours } = useContext(store);
  const [colour, setColour] = useState(colours[0]);
  const prevChangeColours = useRef(false);

  const getRandomColor = (prevColour) => {
    const newColours = colours.filter((colourEntry) => colourEntry !== prevColour);
    const randomColourIndex = random(newColours.length - 1);
    const newColour = newColours[randomColourIndex];

    return newColour;
  };

  const getNewColor = useCallback(() => {
    const newColor = getRandomColor(colour);

    return newColor;
  }, [colour]);

  useEffect(() => {
    if (changeColours && changeColours !== prevChangeColours.current) {
      setColour(getNewColor);
    }

    prevChangeColours.current = changeColours;
  }, [changeColours, getNewColor]);

  return (
    <Styles.LogoElement
      positionX={ positionX }
      positionY={ positionY }
      widthValue={ width }
      heightValue={ height }
      colourValue= { colour }
    >
      <CatLogo />
    </Styles.LogoElement>
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
