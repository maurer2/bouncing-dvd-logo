import type { FC, ReactElement } from 'react';
import React, { useEffect, useRef, useContext } from 'react';

import Store from '../Store';
import useColour from '../Hooks/useColour';
import { ReactComponent as CatLogo } from '../assets/cat.svg';

import * as Styles from './Logo.styles';
import type * as Types from './Logo.types';

const Logo: FC<Readonly<Types.LogoProps>> = ({
  positionX,
  positionY,
  width,
  height,
  changeColours,
  isPaused,
}): ReactElement => {
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

export default Logo;
