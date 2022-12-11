import type { FC, KeyboardEvent, ReactElement, PropsWithChildren } from 'react';
import React, { useRef, useEffect, useCallback } from 'react';
import { StyleSheetManager } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import SoundToggle from '../SoundToggle/SoundToggle';
import PlayingField from '../Playingfield/Playingfield';
import { toggleSound, togglePlayState } from '../Store/actionCreators';
import { getSoundState, getPlayState, getIsPlayingSoundState } from '../Store/selectors';
import type { Dispatch } from '../Store/types';
import SoundPlayer from '../SoundPlayer/SoundPlayer';

import * as Styles from './Game.styles';
import type * as Types from './Game.types';

const Game: FC<Readonly<PropsWithChildren<Types.GameProps>>> = (): ReactElement => {
  const dispatch: Dispatch = useDispatch();
  const soundIsDisabled: boolean = useSelector(getSoundState);
  const isPaused: boolean = useSelector(getPlayState);
  const isPlayingSound: boolean = useSelector(getIsPlayingSoundState);
  const pauseButtonDomElement = useRef<HTMLButtonElement | null>(null);

  const handleClick = (): void => {
    dispatch(togglePlayState());
  };
  const handleInput = (event: KeyboardEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const observedKeys = [' ', 'k']; // " " === spacebar

    if (observedKeys.includes(event.key.toLowerCase())) {
      dispatch(togglePlayState());
    }
  };

  const toggleSoundCB = useCallback(() => {
    dispatch(toggleSound());
  }, [dispatch]);

  // autofocus for pause button
  useEffect(() => {
    pauseButtonDomElement?.current?.focus();
  }, []);

  return (
    <StyleSheetManager disableVendorPrefixes>
      <Styles.GameWrapper data-testid="game">
        <PlayingField />
        <Styles.PauseButton
          tabIndex={0}
          onClick={handleClick}
          onKeyUp={handleInput}
          ref={pauseButtonDomElement}
          aria-label={isPaused ? 'Unpause' : 'Pause'}
          data-testid="pausebutton"
        />
        <SoundToggle
          soundIsDisabled={soundIsDisabled}
          toggleSound={toggleSoundCB}
        />
        <SoundPlayer shouldTriggerSound={isPlayingSound} />
      </Styles.GameWrapper>
    </StyleSheetManager>
  );
};

export default Game;
