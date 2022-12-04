import type { Store, Action } from './types';
import { initialState } from './Store';
import { colours } from './constants';

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducers = (state: Store = initialState, action: Action): Store => {
  switch (action.type) {
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
        colours: {
          current: colours[0],
          previous: null,
          available: colours,
        },
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
      return {
        ...state,
        isPlayingSound: !state.soundIsDisabled,
        collisionCount: state.collisionCount + 1,
        colours: {
          ...state.colours,
          current: action.payload,
          previous: state.colours.current,
        }
    };
    case 'TRIGGER_COLLISION_END':
      return {
        ...state,
        isPlayingSound: false,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducers;
