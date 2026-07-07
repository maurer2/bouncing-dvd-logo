import React, { useRef, useCallback, type KeyboardEvent, type ComponentProps } from 'react';
import { StyleSheetManager } from 'styled-components';

import PlayingField from '../Playingfield/Playingfield';
import SoundPlayer from '../SoundPlayer/SoundPlayer';
import SoundToggle from '../SoundToggle/SoundToggle';
import { useIsPaused } from '../Store';

import * as Styles from './Game.styles';

// type GameProps = Record<string, never>;
type PlayingFieldProps = ComponentProps<typeof PlayingField>;

function Game() {
  const isPaused = useIsPaused();
  const pauseButtonDomElement = useRef<HTMLButtonElement | null>(null);
  const playingFieldRef = useRef<PlayingFieldProps['ref']['current']>(null);

  const handleClick = useCallback(() => {
    playingFieldRef.current?.togglePlayStateInChild();
  }, []);

  const handleInput = useCallback((event: KeyboardEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const observedKeys = [' ', 'k']; // " " === spacebar

    if (observedKeys.includes(event.key.toLowerCase())) {
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
