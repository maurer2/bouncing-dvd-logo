import type { Colour } from '../Store/types';

export type LogoProps = {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  isPaused: boolean;
  currentColour: Colour;
};

export type LogoStyleProps = {
  // from parent props
  [K in keyof Pick<
    LogoProps,
    'positionX' | 'positionY' | 'width' | 'height' | 'isPaused' | 'currentColour'
  > as `$${K}`]: LogoProps[K];
};
