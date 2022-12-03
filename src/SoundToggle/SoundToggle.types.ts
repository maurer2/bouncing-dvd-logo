import type { RootState } from '../Store2/types';

export type SoundToggleProps = {
  children?: never;
  soundIsDisabled: RootState['soundIsDisabled'];
  toggleSound: () => void;
};

export type SoundToggleStyleProps = {
  $status: 'active' | 'inactive';
};
