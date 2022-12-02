export type PlayingfieldProps = {
  // isPaused: boolean;
  triggerCollision: () => void;
};

export type LogoObject = [width: number, height: number];

export type PositionAndVelocity = {
  value: number,
  velocity: number,
  randomness: number,
};

export type ReducerState = {
  positionX: PositionAndVelocity,
  positionY: PositionAndVelocity,
  // isPaused: boolean,
}
