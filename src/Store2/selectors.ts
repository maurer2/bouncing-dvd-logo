import type { RootState } from './types';

export const getSoundState = (state: RootState) => state.soundIsDisabled;
export const getPlayState = (state: RootState) => state.isPaused;
export const getX = (state: RootState) => state.lastPosition[0];
