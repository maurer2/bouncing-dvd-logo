import styled from 'styled-components';

import type { LogoStyleProps } from './Logo.types';

export const LogoElement = styled.figure.attrs<LogoStyleProps>((props) => ({
  style: {
    transform: `translate(${Math.floor(props.$positionX)}px, ${Math.floor(props.$positionY)}px)`,
    color: props.$colour,
  },
}))<LogoStyleProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.$width}px`};
  height: ${(props) => `${props.$height}px`};
  margin: 0;
  will-change: transform;
  opacity: ${({ $isPaused }) => ($isPaused ? '0.25' : '1')};
`;
