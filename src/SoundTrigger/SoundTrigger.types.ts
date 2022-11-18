import type { RootState } from '../Store2/types';

export type SoundTriggerProps = {
  children?: never;
  soundIsDisabled: RootState['soundIsDisabled'];
  toggleSound: () => void;
};

export type SoundTriggerStyleProps = {
  status: 'active' | 'inactive';
};
