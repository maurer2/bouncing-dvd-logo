export type SoundToggleProps = {
  children?: never;
  soundIsDisabled: boolean;
  toggleSound: () => void;
};

export type SoundToggleStyleProps = {
  '$soundIsDisabled': SoundToggleProps['soundIsDisabled'],
};
