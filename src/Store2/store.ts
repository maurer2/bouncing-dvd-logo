import type { Store } from './types';
import { colours } from './const';

export const initialState: Store = {
  lastPosition: [0, 0],
  currentColour: colours[0],
  previousColour: null,
  isPaused: false,
  // isColliding: false,
  soundIsDisabled: true,
  collisionCount: 0,
};
