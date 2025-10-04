import React, { type FC } from 'react';

import { ReactComponent as CatLogo } from '../assets/cat.svg';
import type { Colour } from '../Store/types';

import * as Styles from './Logo.styles';

type LogoProps = {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  currentColour: Colour;
};

const Logo: FC<LogoProps> = ({ positionX, positionY, width, height, currentColour }) => (
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

export default Logo;
