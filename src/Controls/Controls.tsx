import React, { useContext } from 'react';

import Store from '../Store';

import { ReactComponent as SoundOnIcon } from './sound-on.svg';
import { ReactComponent as SoundOffIcon } from './sound-off.svg';
import * as Styles from './Controls.styles';

const Controls = () => {
  const { soundIsDisabled, toggleSound } = useContext(Store);

  function handleClick(event) {
    event.stopPropagation();

    toggleSound();
  }

  return (
    <Styles.Controls>
      <Styles.Control onClick={handleClick}>
        { soundIsDisabled ? <SoundOffIcon /> : <SoundOnIcon /> }
      </Styles.Control>
    </Styles.Controls>
  );
};

export default Controls;
