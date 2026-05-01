import type { ComponentProps } from 'react';
import styled from 'styled-components';

import type Logo from './Logo';

type LogoProps = ComponentProps<typeof Logo>;

type LogoStyleProps = {
  // prefix style props with $ so that they are not passed to dom element
  [K in keyof Pick<
    LogoProps,
    'positionX' | 'positionY' | 'width' | 'height' | 'currentColour'
  > as `$${K}`]: LogoProps[K];
};

export const LogoElement = styled.figure.attrs<LogoStyleProps>(
  ({ $positionX, $positionY, $currentColour }) => ({
    style: {
      translate: `${$positionX}px ${$positionY}px`,
      color: $currentColour,
    },
  }),
)<LogoStyleProps>`
  position: absolute;
  inset-block-start: 0;
  inset-inline0start: 0;
  inline-size: ${(props) => `${props.$width}px`};
  block-size: ${(props) => `${props.$height}px`};
  margin: 0;
  will-change: translate;
  contain: strict;
`;
