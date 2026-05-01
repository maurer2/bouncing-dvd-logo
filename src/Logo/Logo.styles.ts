import type { ComponentProps } from 'react';
import styled from 'styled-components';

import type Logo from './Logo';

type LogoProps = ComponentProps<typeof Logo>;

type LogoStyleProps = {
  // prefix style props with $ so that they are not added to dom element as attribute
  [K in keyof Pick<
    LogoProps,
    'positionX' | 'positionY' | 'width' | 'height' | 'currentColour'
  > as `$${K}`]: LogoProps[K];
};

export const LogoElement = styled.figure.attrs<LogoStyleProps>(
  ({ $positionX, $positionY, $currentColour, theme }) => ({
    style: {
      translate: `${$positionX}px ${$positionY}px`,
      color: theme.colors.accent[$currentColour],
    },
  }),
)<LogoStyleProps>`
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  inline-size: ${(props) => `${props.$width}px`};
  block-size: ${(props) => `${props.$height}px`};
  margin: 0;
  will-change: translate;
  contain: strict;
`;
