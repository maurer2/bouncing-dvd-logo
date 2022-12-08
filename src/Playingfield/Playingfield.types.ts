export type PlayingfieldProps = Record<string, never>;

export type LogoDimensions = [width: number, height: number];

export type PositionAndVelocity = {
  value: number | null;
  velocity: number;
  // randomness: number;
};

export type ReducerState = {
  positionX: PositionAndVelocity;
  positionY: PositionAndVelocity;
};

export type TriggerInitialPosition = {
  type: 'TRIGGER_INITIAL_POSITION';
  payload: {
    worldSize: Pick<DOMRect, 'width' | 'height'>,
    logoSize: LogoDimensions,
  }
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
