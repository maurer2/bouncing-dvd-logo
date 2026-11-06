import { useRef, useCallback, type ComponentProps } from 'react';
import { useHotkeys } from '@tanstack/react-hotkeys';
import { StyleSheetManager } from 'styled-components';

import PlayingField from '../Playingfield/Playingfield';
import SoundPlayer from '../SoundPlayer/SoundPlayer';
import SoundToggle from '../SoundToggle/SoundToggle';
import { useIsPaused } from '../Store';

import * as Styles from './Game.styles';

type PlayingFieldProps = ComponentProps<typeof PlayingField>;

function Game() {
  const isPaused = useIsPaused();
  const pauseButtonDomElement = useRef<HTMLButtonElement | null>(null);
  const playingFieldRef = useRef<PlayingFieldProps['ref']['current']>(null);
  useHotkeys([
    {
      // not triggered while a button is focused as spacebar toggles a focused button and the library ignores spacebar and enter in this case
      // would only be triggered if autofocus fails or autofocus is added to non-button element
      // https://tanstack.com/hotkeys/latest/docs/guides/sensible-defaults#focused-controls-keep-their-own-keys
      hotkey: 'Space',
      callback: () => playingFieldRef.current?.togglePlayStateInChild(),
    },
    // triggered regardless of button focus
    {
      hotkey: 'K',
      callback: () => playingFieldRef.current?.togglePlayStateInChild(),
    },
  ]);

  const handleClick = useCallback(() => {
    playingFieldRef.current?.togglePlayStateInChild();
  }, []);

  return (
    <StyleSheetManager>
      <Styles.GameWrapper data-testid="game">
        <PlayingField ref={playingFieldRef} />
        <Styles.PauseButton
          ref={pauseButtonDomElement}
          aria-label="Pause button"
          aria-pressed={isPaused}
          onClick={handleClick} // also called when spacebar is pressed while button is focused
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
