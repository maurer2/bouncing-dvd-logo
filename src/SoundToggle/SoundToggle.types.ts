import type { RootState } from '../Store/types';

export type SoundToggleProps = {
  children?: never;
  soundIsDisabled: RootState['isSoundDisabled'];
  toggleSound: () => void;
};

export type SoundToggleStyleProps = {
  $status: 'active' | 'inactive';
};
