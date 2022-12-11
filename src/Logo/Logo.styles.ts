import styled from 'styled-components';

import type { LogoStyleProps } from './Logo.types';

export const LogoElement = styled.figure.attrs<LogoStyleProps>((props) => ({
  style: {
    translate: `${props.$positionX}px ${props.$positionY}px`,
    color: props.$currentColour,
  },
}))<LogoStyleProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.$width}px`};
  height: ${(props) => `${props.$height}px`};
  margin: 0;
  will-change: translate;
  contain: strict;
`;
