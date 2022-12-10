import type * as Types from './Playingfield.types';

export const reducer = (state: Types.ReducerState, action: Types.ReducerAction): void => {
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

      newDraft.positionX.value += state.positionX.velocity;
      newDraft.positionY.value += state.positionY.velocity;
      break;
    }
    case 'TRIGGER_X_COLLISION': {
      const newDraft = state;
      const velocityX = action.payload;

      if (newDraft.positionX.value === null) {
        return;
      }

      newDraft.positionX.value += velocityX;
      newDraft.positionX.velocity = velocityX;
      break;
    }
    case 'TRIGGER_Y_COLLISION': {
      const newDraft = state;
      const velocityY = action.payload;

      if (newDraft.positionY.value === null) {
        return;
      }

      newDraft.positionY.value += velocityY;
      newDraft.positionY.velocity = velocityY;
      break;
    }
    default: {
      break;
    }
  }
};
