import React, {
  useRef,
  useCallback,
  type FC,
  type KeyboardEvent,
  type ComponentProps,
} from 'react';
import { StyleSheetManager } from 'styled-components';

import SoundToggle from '../SoundToggle/SoundToggle';
import PlayingField from '../Playingfield/Playingfield';
import SoundPlayer from '../SoundPlayer/SoundPlayer';
import { useIsPaused, useIsSoundDisabled, useIsPlayingSound, useStoreActions } from '../Store2';

import * as Styles from './Game.styles';

// type GameProps = Record<string, never>;
type PlayingFieldProps = ComponentProps<typeof PlayingField>;

const Game: FC = () => {
  const isPaused = useIsPaused();
  const isPlayingSound = useIsPlayingSound();
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
          onClick={handleClick}
          onKeyUp={handleInput}
          ref={pauseButtonDomElement}
          aria-label="Pause button"
          aria-pressed={isPaused}
          data-testid="pausebutton"
          autoFocus
        />
        <SoundPlayer shouldTriggerSound={isPlayingSound} />
        <SoundToggle />
      </Styles.GameWrapper>
    </StyleSheetManager>
  );
};

export default Game;
