export type LogoProps = {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  changeColours: boolean;
  isPaused: boolean;
}

export type LogoStyleProps = Pick<LogoProps, 'positionX' | 'positionY' | 'isPaused'> & {
  colourValue: string,
  widthValue: number,
  heightValue: number;
}
