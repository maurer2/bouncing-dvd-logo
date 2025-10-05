import {
  TRIGGER_COLLISION_END,
  START_GAME,
  TRIGGER_COLLISION,
  TOGGLE_PLAY_STATE,
  TOGGLE_SOUND,
  SET_LAST_POSITION,
} from './actionTypes';
import type {
  Position,
  StartGameAction,
  TriggerCollisionAction,
  TogglePlayStateAction,
  ToggleSoundAction,
  TriggerCollisionActionEnd,
  SetLastPositionAction,
} from './types';

import store from '.';

export function startGame(): StartGameAction {
  return {
    type: START_GAME,
  };
}

export function triggerCollision(): TriggerCollisionAction {
  const { current, available } = store.getState().colours;

  // const coloursWithoutCurrent = new Set(available).difference(new Set([current]));
  const coloursWithoutCurrent = new Set(available);
  coloursWithoutCurrent.delete(current);

  const randomColourIndex = Math.floor(Math.random() * coloursWithoutCurrent.size);
  const newColour = [...coloursWithoutCurrent][randomColourIndex];

  return {
    type: TRIGGER_COLLISION,
    payload: newColour,
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

export function setLastPosition(position: Position): SetLastPositionAction {
  return {
    type: SET_LAST_POSITION,
    payload: position,
  };
}
