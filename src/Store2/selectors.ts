import type { RootState } from './types';

export const getSoundState = (state: RootState) => state.soundIsDisabled;
export const getPlayState = (state: RootState) => state.isPaused;
export const getIsPlayingSoundState = (state: RootState) => state.isPlayingSound;
export const getCurrentColour = (state: RootState) => state.colours.current;
