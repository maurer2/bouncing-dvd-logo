import React, { useRef, useCallback, type KeyboardEvent, type ComponentProps } from 'react';
import { StyleSheetManager } from 'styled-components';

import PlayingField from '../Playingfield/Playingfield';
import SoundPlayer from '../SoundPlayer/SoundPlayer';
import SoundToggle from '../SoundToggle/SoundToggle';
import { useIsPaused } from '../Store';

import * as Styles from './Game.styles';

type PlayingFieldProps = ComponentProps<typeof PlayingField>;

const playPauseKeys = new Set([' ', 'k']); // " " === spacebar

function Game() {
  const isPaused = useIsPaused();
  const pauseButtonDomElement = useRef<HTMLButtonElement | null>(null);
  const playingFieldRef = useRef<PlayingFieldProps['ref']['current']>(null);

  const handleClick = useCallback(() => {
    playingFieldRef.current?.togglePlayStateInChild();
  }, []);

  const handleInput = useCallback((event: KeyboardEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    if (playPauseKeys.has(event.key.toLowerCase())) {
      playingFieldRef.current?.togglePlayStateInChild();
    }
  }, []);

  return (
    <StyleSheetManager>
      <Styles.GameWrapper data-testid="game">
        <PlayingField ref={playingFieldRef} />
        <Styles.PauseButton
          ref={pauseButtonDomElement}
          aria-label="Pause button"
          aria-pressed={isPaused}
          onClick={handleClick}
          onKeyUp={handleInput}
          // todo: replace with callback ref
          // oxlint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
        <SoundToggle />
        <SoundPlayer />
      </Styles.GameWrapper>
    </StyleSheetManager>
  );
}

export default Game;
