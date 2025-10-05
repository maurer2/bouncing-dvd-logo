import { produce } from 'immer';

type PositionAndVelocity = {
  value: number | null;
  velocity: number;
};

export type ReducerState = {
  positionX: PositionAndVelocity;
  positionY: PositionAndVelocity;
};

export type TriggerInitialPosition = {
  type: 'TRIGGER_INITIAL_POSITION';
  payload: {
    worldSize: Pick<DOMRectReadOnly, 'width' | 'height'>;
    logoSize: [width: number, height: number];
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

// https://prateeksurana.me/blog/simplify-immutable-data-structures-in-usereducer-with-immer/#:~:text=Thunder%27%2C%20%27Virtually%20Immortal%27%5D-,useReducer%20with%20Immer,-Now%20that%20we
export const reducers = produce((state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case 'TRIGGER_INITIAL_POSITION': {
      const newDraft = state;
      const { worldSize, logoSize, velocityX, velocityY } = action.payload;

      newDraft.positionX.value = worldSize.width / 2 - logoSize[0] / 2; // dead centre
      newDraft.positionY.value = worldSize.height / 2 - logoSize[1] / 2; // dead centre
      newDraft.positionX.velocity = velocityX;
      newDraft.positionY.velocity = velocityY;

      break;
    }
    case 'TRIGGER_NEXT_POSITION': {
      const newDraft = state;

      if (newDraft.positionX.value === null || newDraft.positionY.value === null) {
        return;
      }

      newDraft.positionX.value = Math.round(newDraft.positionX.value + state.positionX.velocity);
      newDraft.positionY.value = Math.round(newDraft.positionY.value + state.positionY.velocity);

      break;
    }
    case 'TRIGGER_X_COLLISION': {
      const newDraft = state;
      const velocityX = action.payload;

      if (newDraft.positionX.value === null) {
        return;
      }

      newDraft.positionX.value = Math.round(newDraft.positionX.value + velocityX);
      newDraft.positionX.velocity = Math.round(velocityX);

      break;
    }
    case 'TRIGGER_Y_COLLISION': {
      const newDraft = state;
      const velocityY = action.payload;

      if (newDraft.positionY.value === null) {
        return;
      }

      newDraft.positionY.value = Math.round(newDraft.positionY.value + velocityY);
      newDraft.positionY.velocity = Math.round(velocityY);

      break;
    }
    default: {
      break;
    }
  }
});
