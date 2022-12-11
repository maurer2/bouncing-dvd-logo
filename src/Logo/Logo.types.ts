import type { Colour } from '../Store/types';

export type LogoProps = {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  currentColour: Colour;
};

export type LogoStyleProps = {
  [K in keyof Pick<
    LogoProps,
    'positionX' | 'positionY' | 'width' | 'height' | 'currentColour'
  > as `$${K}`]: LogoProps[K];
};
