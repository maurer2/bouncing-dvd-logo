import type { Store } from './types';
import { colours } from './const';

export const initialState: Store = {
  lastPosition: null,
  currentColour: colours[0],
  previousColour: null,
  isPaused: true,
  soundIsDisabled: true,
  collisionCount: 0,
};
