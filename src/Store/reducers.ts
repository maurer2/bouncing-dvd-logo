import type { Store, Action, RootState } from './types';
import { initialState } from './Store';
import { colours } from './constants';

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducers = (state: RootState = initialState, action: Action): Store => {
  switch (action.type) {
    case 'START_GAME': {
      return {
        ...state,
        isPaused: false,
        isPlayingSound: false,
        colours: {
          current: colours[0],
          previous: null,
          available: [...colours],
        },
        collisionCount: 0,
        lastPosition: null,
      };
    }
    case 'TOGGLE_PLAY_STATE': {
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
        },
      };
    case 'TRIGGER_COLLISION_END':
      return {
        ...state,
        isPlayingSound: false,
      };
    case 'SET_LAST_POSITION':
      return {
        ...state,
        lastPosition: action.payload,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducers;
