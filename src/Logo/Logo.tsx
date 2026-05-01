import React from 'react';

import { ReactComponent as CatLogo } from '../assets/cat.svg';
import type { Colour } from '../Store/types';

// eslint-disable-next-line import-x/no-namespace
import * as Styles from './Logo.styles';

type LogoProps = {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  currentColour: Colour;
};

function Logo({ positionX, positionY, width, height, currentColour }: LogoProps) {
  return (
    // figure tag
    <Styles.LogoElement
      $positionX={positionX}
      $positionY={positionY}
      $width={width}
      $height={height}
      $currentColour={currentColour}
    >
      <CatLogo
        role="img"
        aria-label="Cat logo"
      />
    </Styles.LogoElement>
  );
}

export default Logo;
