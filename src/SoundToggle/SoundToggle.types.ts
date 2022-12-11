export type SoundToggleProps = {
  children?: never;
  soundIsDisabled: boolean;
  toggleSound: () => void;
};

export type SoundToggleStyleProps = {
  $status: 'active' | 'inactive';
};
