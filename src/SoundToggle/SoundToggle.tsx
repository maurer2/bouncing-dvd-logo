import React from 'react';
import type { FC, MouseEvent, ReactElement } from 'react';

import * as Styles from './SoundToggle.styles';
import type * as Types from './SoundToggle.types';

const SoundToggle: FC<Readonly<Types.SoundToggleProps>> = ({
  soundIsDisabled,
  toggleSound,
}): ReactElement => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    toggleSound();
  };

  return (
    <Styles.SoundToggle
      onClick={handleClick}
      aria-label={soundIsDisabled ? 'Enable sound' : 'Disable sound'}
      data-testid="soundtoggle"
    >
      <Styles.SoundToggleIcon
        $soundIsDisabled={soundIsDisabled}
        data-testid="soundtoggle-icon"
      />
    </Styles.SoundToggle>
  );
};

export default SoundToggle;
