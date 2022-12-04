import type { Colour } from '../Store2/types';

export type PlayingfieldProps = {
  isPaused: boolean;
  triggerCollision: () => void;
  currentColor: Colour;
};

export type LogoDimensions = [width: number, height: number];

export type PositionAndVelocity = {
  value: number;
  velocity: number;
  randomness: number;
};

export type ReducerState = {
  positionX: PositionAndVelocity;
  positionY: PositionAndVelocity;
};
