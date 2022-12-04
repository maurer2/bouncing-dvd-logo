import type { Store } from './types';
import { colours } from './constants';

export const initialState: Store = {
  lastPosition: [0, 0],
  colours: {
    current: colours[0],
    previous: null,
    available: colours,
  },
  isPaused: false,
  isPlayingSound: false,
  soundIsDisabled: true,
  collisionCount: 0,
};
