import React, { useRef, useCallback, type FC, type KeyboardEvent } from 'react';
import { StyleSheetManager } from 'styled-components';

import SoundToggle from '../SoundToggle/SoundToggle';
import PlayingField from '../Playingfield/Playingfield';
import SoundPlayer from '../SoundPlayer/SoundPlayer';
import { useIsPaused, useIsSoundDisabled, useIsPlayingSound, useStoreActions } from '../Store2';

import * as Styles from './Game.styles';

// type GameProps = Record<string, never>;

const Game: FC = () => {
  const isSoundDisabled = useIsSoundDisabled();
  const isPaused = useIsPaused();
  const isPlayingSound = useIsPlayingSound();
  const pauseButtonDomElement = useRef<HTMLButtonElement | null>(null);
  const { togglePlayState, toggleSoundState } = useStoreActions();

  const handleClick = useCallback(() => {
    togglePlayState();
  }, [togglePlayState]);

  const handleInput = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      const observedKeys = [' ', 'k']; // " " === spacebar

      if (observedKeys.includes(event.key.toLowerCase())) {
        togglePlayState();
      }
    },
    [togglePlayState],
  );

  const handleSoundToggle = useCallback(() => {
    toggleSoundState();
  }, [toggleSoundState]);

  return (
    <StyleSheetManager>
      <Styles.GameWrapper data-testid="game">
        <PlayingField />
        <Styles.PauseButton
          onClick={handleClick}
          onKeyUp={handleInput}
          ref={pauseButtonDomElement}
          aria-label="Pause button"
          aria-pressed={isPaused}
          data-testid="pausebutton"
          autoFocus
        />
        <SoundToggle
          isSoundDisabled={isSoundDisabled}
          onSoundToggle={handleSoundToggle}
        />
        <SoundPlayer shouldTriggerSound={isPlayingSound} />
      </Styles.GameWrapper>
    </StyleSheetManager>
  );
};

export default Game;
