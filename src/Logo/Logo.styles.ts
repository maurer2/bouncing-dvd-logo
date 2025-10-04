import type { ComponentProps } from 'react';
import styled from 'styled-components';

import type Component from './Logo';

type LogoProps = ComponentProps<typeof Component>;

type LogoStyleProps = {
  // prefix style props with $ so that they are not passed to dom element
  [K in keyof Pick<
    LogoProps,
    'positionX' | 'positionY' | 'width' | 'height' | 'currentColour'
  > as `$${K}`]: LogoProps[K];
};

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
