import type {
  Position,
  StartGameAction,
  ResetGameAction,
  TriggerCollisionAction,
  TogglePlayStateAction,
  ToggleSoundAction,
} from './types';
import {
  START_GAME,
  RESET_GAME,
  TRIGGER_COLLISION,
  TOGGLE_PLAY_STATE,
  TOGGLE_SOUND,
} from './actionTypes';

export function startGame(): StartGameAction {
  return {
    type: START_GAME,
  };
}

export function resetGame(): ResetGameAction {
  return {
    type: RESET_GAME,
  };
}

export function triggerCollision(/* position: Position */): TriggerCollisionAction {
  return {
    type: TRIGGER_COLLISION,
   // payload: position,
  };
}

export function togglePlayState(): TogglePlayStateAction {
  return {
    type: TOGGLE_PLAY_STATE,
  };
}

export function toggleSound(): ToggleSoundAction {
  return {
    type: TOGGLE_SOUND,
  };
}
