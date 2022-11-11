export type LogoProps = {
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  changeColours: boolean;
  isPaused: boolean;
}

// todo replace with mapped types and key remapping to prefix values with $ for transient props
export type LogoStyleProps = {
  $positionX: LogoProps['positionX'];
  $positionY: LogoProps['positionY'];
  $isPaused: LogoProps['isPaused'];
  $colourValue: string,
  $widthValue: number,
  $heightValue: number;
}
