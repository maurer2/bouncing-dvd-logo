import React, { useContext } from 'react';
import store from '../store';

import * as Styles from './Controls.styles';

const Controls = () => {
  const { soundIsDisabled, toggleSound } = useContext(store);

  const handleClick = () => {
    console.log('handleClick', soundIsDisabled);
    toggleSound();
  };

  return (
    <Styles.Controls>
      <Styles.Control onClick={handleClick}>
        Click
      </Styles.Control>
    </Styles.Controls>
  );
};

export default Controls;
