import type { colours } from './Store';

export type Colours = typeof colours[number];

export type StoreType = {
  colours: Colours[];
  soundIsDisabled: boolean;
  toggleSound: () => void;
};
