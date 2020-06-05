import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import random from 'lodash.random';

import Store from '../Store';

import * as Styles from './Logo.styles';
import { ReactComponent as CatLogo } from './cat.svg';

const Logo = ({ positionX, positionY, width, height, changeColours, isPaused }) => {
  const { colours } = useContext(Store);
  const [colour, setColour] = useState(colours[0]);
  const prevChangeColours = useRef(false);

  const setNewColour = useCallback(() => {
    const newColours = colours.filter((colourEntry) => colourEntry !== colour);
    const randomColourIndex = random(newColours.length - 1);
    const newColour = newColours[randomColourIndex];

    setColour(newColour);
  }, [colour, colours]);

  useEffect(() => {
    if (changeColours && changeColours !== prevChangeColours.current) {
      setNewColour();
    }

    prevChangeColours.current = changeColours;
  }, [changeColours, setNewColour]);

  return (
    <Styles.LogoElement
      positionX={positionX}
      positionY={positionY}
      widthValue={width}
      heightValue={height}
      colourValue={colour}
      isPaused={isPaused}
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
  isPaused: bool,
};

export default Logo;
