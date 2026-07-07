import React from 'react';

import CatLogo from '../assets/cat.svg?react';
import type { accentColourNames } from '../Theme/tokens';

import * as Styles from './Logo.styles';

type Colour = (typeof accentColourNames)[number];

type LogoProps = {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  currentColour: Colour;
};

function Logo({ positionX, positionY, width, height, currentColour }: LogoProps) {
  return (
    <Styles.LogoElement
      $positionX={positionX}
      $positionY={positionY}
      $width={width}
      $height={height}
      $currentColour={currentColour}
    >
      <CatLogo
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role - img can't be used as colour is supposed to be changed via CSS
        role="img"
        aria-label="Cat logo"
      />
    </Styles.LogoElement>
  );
}

export default Logo;
