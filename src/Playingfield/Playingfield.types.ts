import type { Colour } from '../Store/types';

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

export type TriggerInitialPosition = {
  type: 'TRIGGER_INITIAL_POSITION';
  payload: Pick<DOMRect, 'width' | 'height'>
};

export type TriggerNextPosition = {
  type: 'TRIGGER_NEXT_POSITION';
};

export type TriggerXCollision = {
  type: 'TRIGGER_X_COLLISION';
};

export type TriggerYCollision = {
  type: 'TRIGGER_Y_COLLISION';
};

export type ReducerAction =
  | TriggerInitialPosition
  | TriggerNextPosition
  | TriggerXCollision
  | TriggerYCollision;
