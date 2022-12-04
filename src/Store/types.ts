import type { colours } from './constants';
import type {
  START_GAME,
  PAUSE_GAME,
  RESET_GAME,
  TRIGGER_COLLISION,
  TOGGLE_PLAY_STATE,
  TOGGLE_SOUND,
  TRIGGER_COLLISION_END,
} from './actionTypes';

import type store from '.';

// store
export type Position = [x: number, y: number];
export type Colour = typeof colours[number];
export type Store = {
  lastPosition: Position | null;
  colours: {
    current: Colour,
    previous: Colour | null,
    available: ReadonlyArray<Colour>,
  },
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
export type PauseGameAction = {
  type: typeof PAUSE_GAME;
  payload: Position;
};
export type ResetGameAction = {
  type: typeof RESET_GAME;
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
export type Action =
  | StartGameAction
  | PauseGameAction
  | ResetGameAction
  | TriggerCollisionAction
  | TogglePlayStateAction
  | ToggleSoundAction
  | TriggerCollisionActionEnd;
