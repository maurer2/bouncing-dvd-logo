import React, { type FC } from 'react';

import { useStoreActions, useIsSoundDisabled } from '../Store2';

import * as Styles from './SoundToggle.styles';

type SoundToggleProps = Record<string, never>;

const SoundToggle: FC<SoundToggleProps> = () => {
  const { toggleSoundState } = useStoreActions();
  const isSoundDisabled = useIsSoundDisabled();

  const handleClick = (): void => {
    toggleSoundState();
  };

  return (
    <Styles.SoundToggleButton
      onClick={handleClick}
      // https://github.com/w3c/wcag/issues/2038
      // https://github.com/w3c/aria-practices/issues/121
      aria-label="Play sound"
      aria-pressed={!isSoundDisabled}
    >
      <Styles.SoundToggleIcon
        $isSoundDisabled={isSoundDisabled}
        data-testid="soundtoggle-icon"
        aria-hidden
      />
    </Styles.SoundToggleButton>
  );
};

export default SoundToggle;
