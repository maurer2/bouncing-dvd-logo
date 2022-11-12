import React, {
  useEffect, useRef, useContext, VFC,
} from 'react';
import PropTypes from 'prop-types';

import Store from '../Store';
import useColour from '../Hooks/useColour';
import { ReactComponent as CatLogo } from '../assets/cat.svg';

import * as Styles from './Logo.styles';
import * as Types from './Logo.types';

const Logo: VFC<Readonly<Types.LogoProps>> = ({
  positionX,
  positionY,
  width,
  height,
  changeColours,
  isPaused,
}): JSX.Element => {
  const { colours } = useContext(Store);
  const prevChangeColours = useRef(false);
  const [colour, setColour] = useColour(colours);

  useEffect(() => {
    if (changeColours && changeColours !== prevChangeColours.current) {
      setColour();
    }

    prevChangeColours.current = changeColours;
  }, [changeColours, setColour]);

  return (
    <Styles.LogoElement
      $positionX={positionX}
      $positionY={positionY}
      $width={width}
      $height={height}
      $colour={colour}
      $isPaused={isPaused}
      data-testid="logo-element"
    >
      <CatLogo data-testid="cat-logo" />
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
