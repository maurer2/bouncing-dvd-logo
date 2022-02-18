import styled from 'styled-components';

import { LogoStyleProps } from './Logo.types';

export const LogoElement = styled.figure.attrs<LogoStyleProps>((props) => ({
  style: {
    transform: `translate(${Math.floor(props.positionX)}px, ${Math.floor(props.positionY)}px)`,
    color: props.colourValue,
  },
}))<LogoStyleProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => `${props.widthValue}px`};
  height: ${(props) => `${props.heightValue}px`};
  margin: 0;
  will-change: transform;
  opacity: ${({ isPaused }) => (isPaused ? '0.25' : '1')};
`;
