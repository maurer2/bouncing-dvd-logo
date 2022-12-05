import type { FC, KeyboardEvent, ReactElement, PropsWithChildren } from 'react';
import React, { useRef, useEffect, useCallback } from 'react';
import { StyleSheetManager } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import SoundToggle from '../SoundToggle/SoundToggle';
import PlayingField from '../Playingfield/Playingfield';
import {
  startGame,
  toggleSound,
  togglePlayState,
  triggerCollision,
  triggerCollisionEnd,
} from '../Store/actionCreators';
import {
  getSoundState,
  getPlayState,
  getIsPlayingSoundState,
  getCurrentColour,
} from '../Store/selectors';
import type { Dispatch, Colour } from '../Store/types';
import SoundPlayer from '../SoundPlayer/SoundPlayer';

import * as Styles from './Game.styles';
import type * as Types from './Game.types';

const Game: FC<Readonly<PropsWithChildren<Types.GameProps>>> = (): ReactElement => {
  const dispatch: Dispatch = useDispatch();
  const soundIsDisabled: boolean = useSelector(getSoundState);
  const isPaused: boolean = useSelector(getPlayState);
  const isPlayingSound: boolean = useSelector(getIsPlayingSoundState);
  const currentColor: Colour = useSelector(getCurrentColour);
  const pauseButtonDomElement = useRef<HTMLButtonElement>(null);

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

  // init
  // useEffect(() => {
  // dispatch(startGame());
  // }, [dispatch]);

  // autofocus
  useEffect(() => {
    pauseButtonDomElement?.current?.focus();
  }, []);

  const toggleSoundCB = useCallback(() => {
    dispatch(toggleSound());
  }, [dispatch]);

  const triggerCollisionCB = useCallback(() => {
    dispatch(triggerCollision());

    // todo replace with redux thunk
    setTimeout(() => {
      dispatch(triggerCollisionEnd());
    }, 800);
  }, [dispatch]);

  return (
    <StyleSheetManager disableVendorPrefixes>
      <Styles.GameWrapper data-testid="game-wrapper">
        <PlayingField
          isPaused={isPaused}
          triggerCollision={triggerCollisionCB}
          currentColor={currentColor}
          data-testid="game-playingfield"
        />
        <Styles.PauseButton
          tabIndex={0}
          onClick={handleClick}
          onKeyUp={handleInput}
          ref={pauseButtonDomElement}
          aria-label={isPaused ? 'Unpause' : 'Pause'}
          data-testid="game-pausebutton"
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
