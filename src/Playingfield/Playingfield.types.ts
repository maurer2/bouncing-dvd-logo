export type PlayingfieldProps = Record<string, never>;

export type LogoDimensions = [width: number, height: number];

export type PositionAndVelocity = {
  value: number | null;
  velocity: number;
};

// reducer
export type ReducerState = {
  positionX: PositionAndVelocity;
  positionY: PositionAndVelocity;
};

export type TriggerInitialPosition = {
  type: 'TRIGGER_INITIAL_POSITION';
  payload: {
    worldSize: Pick<DOMRect, 'width' | 'height'>;
    logoSize: LogoDimensions;
    velocityX: number;
    velocityY: number;
  };
};

export type TriggerNextPosition = {
  type: 'TRIGGER_NEXT_POSITION';
};

export type TriggerXCollision = {
  type: 'TRIGGER_X_COLLISION';
  payload: number;
};

export type TriggerYCollision = {
  type: 'TRIGGER_Y_COLLISION';
  payload: number;
};

export type ReducerAction =
  | TriggerInitialPosition
  | TriggerNextPosition
  | TriggerXCollision
  | TriggerYCollision;
