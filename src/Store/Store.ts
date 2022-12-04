import type { Store } from './types';
import { colours } from './constants';

export const initialState: Store = {
  lastPosition: null,
  colours: {
    current: colours[0],
    previous: null,
    available: colours,
  },
  isPaused: false,
  soundIsDisabled: true,
  isPlayingSound: false,
  collisionCount: 0,
};
