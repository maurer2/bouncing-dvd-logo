import React, { useContext } from 'react';
import store from '../store';

import * as Styles from './Controls.styles';

const Controls = () => {
  const { soundIsDisabled, toggleSound } = useContext(store);

  const handleClick = (event) => {
    event.stopPropagation();

    toggleSound();
  };

  return (
    <Styles.Controls>
      <Styles.Control onClick={handleClick}>
        { soundIsDisabled ? 'Enable' : 'Disable' } sound
      </Styles.Control>
    </Styles.Controls>
  );
};

export default Controls;
