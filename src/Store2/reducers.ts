import type { Store, Action } from './types';
import { initialState } from './store';
import { colours } from './const';

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducers = (state: Store = initialState, action: Action): Store => {
  const { type } = action;
  switch (type) {
    case 'START_GAME': {
      return {
        ...state,
        isPaused: false,
      };
    }
    case 'PAUSE_GAME': {
      return {
        ...state,
        isPaused: !state.isPaused,
        lastPosition: action.payload,
      };
    }
    case 'RESET_GAME': {
      return {
        ...state,
        collisionCount: 0,
        currentColour: colours[0],
        isPaused: true,
      };
    }
    case 'TOGGLE_PLAY_STATE': {
      // todo: set last position
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    }
    case 'TOGGLE_SOUND': {
      return {
        ...state,
        soundIsDisabled: !state.soundIsDisabled,
      };
    }
    case 'TRIGGER_COLLISION':
      // todo set new colour
      // todo store last colour
      return {
        ...state,
        collisionCount: state.collisionCount + 1,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducers;
