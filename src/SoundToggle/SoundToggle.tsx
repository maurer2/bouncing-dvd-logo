import React from 'react';

import { useStoreActions, useIsSoundDisabled } from '../Store2';

// eslint-disable-next-line import-x/no-namespace
import * as Styles from './SoundToggle.styles';

function SoundToggle() {
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
}

export default SoundToggle;
