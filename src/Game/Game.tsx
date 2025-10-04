import React, {
  useRef,
  useCallback,
  type FC,
  type KeyboardEvent,
  type PropsWithChildren,
} from 'react';
import { StyleSheetManager } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import SoundToggle from '../SoundToggle/SoundToggle';
import PlayingField from '../Playingfield/Playingfield';
import SoundPlayer from '../SoundPlayer/SoundPlayer';
import { toggleSound, togglePlayState } from '../Store/actionCreators';
import { getSoundState, getPlayState, getIsPlayingSoundState } from '../Store/selectors';

import * as Styles from './Game.styles';

type GameProps = PropsWithChildren;

const Game: FC<GameProps> = () => {
  const dispatch = useDispatch();
  const isSoundDisabled = useSelector(getSoundState);
  const isPaused = useSelector(getPlayState);
  const isPlayingSound = useSelector(getIsPlayingSoundState);
  const pauseButtonDomElement = useRef<HTMLButtonElement | null>(null);

  const handleClick = useCallback(() => {
    dispatch(togglePlayState());
  }, [dispatch]);

  const handleInput = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      const observedKeys = [' ', 'k']; // " " === spacebar

      if (observedKeys.includes(event.key.toLowerCase())) {
        dispatch(togglePlayState());
      }
    },
    [dispatch],
  );

  const toggleSoundCB = useCallback(() => {
    dispatch(toggleSound());
  }, [dispatch]);

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
          toggleSound={toggleSoundCB}
        />
        <SoundPlayer shouldTriggerSound={isPlayingSound} />
      </Styles.GameWrapper>
    </StyleSheetManager>
  );
};

export default Game;
