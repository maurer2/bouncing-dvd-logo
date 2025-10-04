import React from 'react';
import type { FC } from 'react';

import * as Styles from './SoundToggle.styles';

type SoundToggleProps = {
  isSoundDisabled: boolean;
  toggleSound: () => void;
};

const SoundToggle: FC<SoundToggleProps> = ({ isSoundDisabled, toggleSound }) => {
  const handleClick = (): void => {
    toggleSound();
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
