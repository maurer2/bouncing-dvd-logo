import React from 'react';
import type { FC, MouseEvent, ReactElement } from 'react';

import * as Styles from './SoundTrigger.styles';
import type * as Types from './SoundTrigger.types';

const SoundTrigger: FC<Readonly<Types.SoundTriggerProps>> = ({soundIsDisabled, toggleSound}): ReactElement => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleSound();
  };

  return (
    <Styles.SoundTrigger
      onClick={handleClick}
      data-testid="soundtrigger"
    >
      <Styles.SoundTriggerIcon
        status={soundIsDisabled ? 'inactive' : 'active'}
        data-testid="soundtrigger-icon"
      />
      <Styles.SoundTriggerText data-testid="soundtrigger-text">
        {soundIsDisabled ? 'Enable sound' : 'Disable sound'}
      </Styles.SoundTriggerText>
    </Styles.SoundTrigger>
  );
};

export default SoundTrigger;
