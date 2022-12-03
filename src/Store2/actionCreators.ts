import { TRIGGER_COLLISION_END ,
  START_GAME,
  PAUSE_GAME,
  RESET_GAME,
  TRIGGER_COLLISION,
  TOGGLE_PLAY_STATE,
  TOGGLE_SOUND,
} from './actionTypes';
import type {
  Position,
  StartGameAction,
  PauseGameAction,
  ResetGameAction,
  TriggerCollisionAction,
  TogglePlayStateAction,
  ToggleSoundAction,
  TriggerCollisionActionEnd
} from './types';

export function startGame(): StartGameAction {
  return {
    type: START_GAME,
  };
}

export function pauseGame(position: Position): PauseGameAction {
  return {
    type: PAUSE_GAME,
    payload: position,
  };
}

export function resetGame(): ResetGameAction {
  return {
    type: RESET_GAME,
  };
}

export function triggerCollision(): TriggerCollisionAction {
  return {
    type: TRIGGER_COLLISION,
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

// temp
export function triggerCollisionEnd(): TriggerCollisionActionEnd {
  return {
    type: TRIGGER_COLLISION_END,
  };
}
