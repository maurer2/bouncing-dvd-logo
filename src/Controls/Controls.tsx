import React, { useContext, FC, MouseEvent } from 'react';

import Store from '../Store';

import { ReactComponent as SoundOnIcon } from './sound-on.svg';
import { ReactComponent as SoundOffIcon } from './sound-off.svg';
import * as Styles from './Controls.styles';
import * as Types from './Controls.types';

const Controls: FC<Readonly<Types.ControlProps>> = (): JSX.Element => {
  const { soundIsDisabled, toggleSound } = useContext(Store);

  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation();

    toggleSound();
  }

  return (
    <Styles.Controls>
      <Styles.Control onClick={(event: MouseEvent<HTMLButtonElement>) => handleClick(event)}>
        { soundIsDisabled ? <SoundOffIcon /> : <SoundOnIcon /> }
      </Styles.Control>
    </Styles.Controls>
  );
};

export default Controls;
