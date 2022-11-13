import React, { useContext } from 'react';
import type { FC, MouseEvent, ReactElement } from 'react';

import Store from '../Store';

import * as Styles from './Controls.styles';
import type * as Types from './Controls.types';

const Controls: FC<Readonly<Types.ControlProps>> = (): ReactElement => {
  const { soundIsDisabled, toggleSound } = useContext(Store);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    toggleSound();
  };

  return (
    <Styles.Controls data-testid="controls">
      <Styles.Control
        onClick={handleClick}
        data-testid="controls-control"
      >
        <Styles.Icon
          status={soundIsDisabled ? 'inactive' : 'active'}
          data-testid="controls-icon"
        />
      </Styles.Control>
    </Styles.Controls>
  );
};

export default Controls;
