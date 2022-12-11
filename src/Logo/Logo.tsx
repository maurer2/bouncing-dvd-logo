import type { FC, ReactElement } from 'react';
import React from 'react';

import { ReactComponent as CatLogo } from '../assets/cat.svg';

import * as Styles from './Logo.styles';
import type * as Types from './Logo.types';

const Logo: FC<Readonly<Types.LogoProps>> = ({
  positionX,
  positionY,
  width,
  height,
  currentColour,
}): ReactElement => (
  <Styles.LogoElement
    $positionX={positionX}
    $positionY={positionY}
    $width={width}
    $height={height}
    $currentColour={currentColour}
    data-testid="logo-element"
  >
    <CatLogo data-testid="cat-logo" />
  </Styles.LogoElement>
);

export default Logo;
