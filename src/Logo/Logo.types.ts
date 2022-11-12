import type { StoreType } from '../Store';

export type LogoProps = {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  changeColours: boolean;
  isPaused: boolean;
};

export type LogoStyleProps = {
  // from parent props
  [K in keyof Pick<LogoProps, 'positionX' | 'positionY' | 'width' | 'height' | 'isPaused'> as `$${K}`]: LogoProps[K]
} & {
  // from context
  $colour: StoreType['colours'][number],
};
