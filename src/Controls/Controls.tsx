import React, { useContext, VFC, MouseEvent } from 'react';

import Store from '../Store';

import * as Styles from './Controls.styles';
import * as Types from './Controls.types';

const Controls: VFC<Readonly<Types.ControlProps>> = (): JSX.Element => {
  const { soundIsDisabled, toggleSound } = useContext(Store);

  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation();

    toggleSound();
  }

  return (
    <Styles.Controls data-testid="controls">
      <Styles.Control onClick={(event) => handleClick(event)} data-testid="controls-control">
        <Styles.Icon status={soundIsDisabled ? 'inactive' : 'active'} data-testid="controls-icon" />
      </Styles.Control>
    </Styles.Controls>
  );
};

export default Controls;
