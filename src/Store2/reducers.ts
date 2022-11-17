import type { Store, Action } from './types';
import { initialState } from './store';

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
    case 'RESET_GAME':
    case 'TOGGLE_PLAY_STATE':
    case 'TOGGLE_SOUND':
    case 'TRIGGER_COLLISION':
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducers;
