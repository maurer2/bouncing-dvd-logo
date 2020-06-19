import React, {
  useEffect, useState, useRef, useContext, useCallback, FC,
} from 'react';
import PropTypes from 'prop-types';
import { random } from 'lodash-es';

import Store from '../Store';

import * as Styles from './Logo.styles';
import * as Types from './Logo.types';
import { ReactComponent as CatLogo } from './cat.svg';

const Logo: FC<Readonly<Types.GameProps>> = ({
  positionX,
  positionY,
  width,
  height,
  changeColours,
  isPaused,
}): JSX.Element => {
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
  positionX: number.isRequired,
  positionY: number.isRequired,
  width: number.isRequired,
  height: number.isRequired,
  changeColours: bool.isRequired,
  isPaused: bool.isRequired,
};

export default Logo;
