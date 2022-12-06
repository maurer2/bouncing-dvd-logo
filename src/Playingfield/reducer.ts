import type * as Types from './Playingfield.types';

export const reducer = (state: Types.ReducerState, action: Types.ReducerAction): void => {
  switch (action.type) {
    case 'TRIGGER_INITIAL_POSITION': {
      const newDraft = state;
      const { worldSize, logoSize } = action.payload;

      newDraft.positionX.value = worldSize.width / 2 - logoSize[0] / 2;
      newDraft.positionY.value = worldSize.height / 2 - logoSize[1] / 2;

      break;
    }
    case 'TRIGGER_NEXT_POSITION': {
      const newDraft = state;

      newDraft.positionX.value += state.positionX.velocity;
      newDraft.positionY.value += state.positionY.velocity;
      break;
    }
    case 'TRIGGER_X_COLLISION': {
      const newDraft = state;

      newDraft.positionX.value += state.positionX.velocity * -1;
      newDraft.positionX.velocity *= -1;
      break;
    }
    case 'TRIGGER_Y_COLLISION': {
      const newDraft = state;

      newDraft.positionY.value += state.positionY.velocity * -1;
      newDraft.positionY.velocity *= -1;
      break;
    }
    default: {
      break;
    }
  }
};
