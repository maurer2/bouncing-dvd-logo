import type { colours } from './constants';
import type {
  START_GAME,
  TRIGGER_COLLISION,
  TOGGLE_PLAY_STATE,
  TOGGLE_SOUND,
  TRIGGER_COLLISION_END,
  SET_LAST_POSITION,
} from './actionTypes';

import type store from '.';

// store
export type Position = [x: number, y: number];
export type Colour = typeof colours[number];
export type Store = {
  lastPosition: Position | null;
  colours: {
    current: Colour;
    previous: Colour | null;
    available: Colour[];
  };
  isPaused: boolean;
  isPlayingSound: boolean;
  soundIsDisabled: boolean;
  collisionCount: number;
};
export type RootState = Store;
export type Dispatch = typeof store.dispatch;

// action types
export type StartGameAction = {
  type: typeof START_GAME;
};
export type TriggerCollisionAction = {
  type: typeof TRIGGER_COLLISION;
  payload: Colour;
};
export type TogglePlayStateAction = {
  type: typeof TOGGLE_PLAY_STATE;
};
export type ToggleSoundAction = {
  type: typeof TOGGLE_SOUND;
};
export type TriggerCollisionActionEnd = {
  type: typeof TRIGGER_COLLISION_END;
};
export type SetLastPositionAction = {
  type: typeof SET_LAST_POSITION;
  payload: Position;
};
export type Action =
  | StartGameAction
  | TriggerCollisionAction
  | TogglePlayStateAction
  | ToggleSoundAction
  | TriggerCollisionActionEnd
  | SetLastPositionAction;
