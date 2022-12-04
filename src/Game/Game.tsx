import type {
  FC,
  KeyboardEvent,
  ReactElement,
  ReducerWithoutAction,
  PropsWithChildren,
} from 'react';
import React, { useRef, useEffect, useReducer, useCallback } from 'react';
import { debounce } from 'lodash-es';
import { nanoid } from 'nanoid';
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
} from '../Store2/actionCreators';
import {
  getSoundState,
  getPlayState,
  getIsPlayingSoundState,
  getCurrentColour,
} from '../Store2/selectors';
import type { Dispatch, Colour } from '../Store2/types';
import SoundPlayer from '../SoundPlayer/SoundPlayer';

import * as Styles from './Game.styles';
import type * as Types from './Game.types';

const Game: FC<Readonly<PropsWithChildren<Types.GameProps>>> = (): ReactElement => {
  const dispatch: Dispatch = useDispatch();
  const soundIsDisabled: boolean = useSelector(getSoundState);
  const isPaused: boolean = useSelector(getPlayState);
  const isPlayingSound: boolean = useSelector(getIsPlayingSoundState);
  const currentColor: Colour = useSelector(getCurrentColour);

  // todo replace with restoring via "lostPosition" information
  const [keyValue, setKeyValue] = useReducer<ReducerWithoutAction<string>>(
    () => nanoid(10),
    nanoid(10),
  );
  const wrapperDomElement = useRef<HTMLDivElement>(null);
  const pauseButtonDomElement = useRef<HTMLButtonElement>(null);
  const isInitialResize = useRef(true);
  const debouncedResizeHandler = useRef<ReturnType<typeof debounce> | null>(null);
  const gameResizeObserver = useRef(
    new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const gameHasResized: boolean = entries.some(
        (entry) => entry.target === wrapperDomElement.current,
      );

      // ignore resize observer on dom load
      if (isInitialResize.current) {
        isInitialResize.current = false;

        return;
      }

      if (gameHasResized && debouncedResizeHandler.current) {
        debouncedResizeHandler.current();
      }
    }),
  );

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

  // setup resize observer
  useEffect(() => {
    debouncedResizeHandler.current = debounce(setKeyValue, 300);

    const currentResizeObserver: ResizeObserver = gameResizeObserver.current;
    const currentDomElement: HTMLElement = wrapperDomElement.current;

    if (!currentDomElement) {
      return undefined;
    }
    currentResizeObserver.observe(currentDomElement);

    return () => {
      currentResizeObserver.unobserve(currentDomElement);
    };
  }, []);

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
      <Styles.GameWrapper
        ref={wrapperDomElement}
        data-testid="game-wrapper"
      >
        <PlayingField
          isPaused={isPaused}
          triggerCollision={triggerCollisionCB}
          currentColor={currentColor}
          key={`key-${keyValue}`}
          data-testid="game-playingfield"
          data-key={`key-${keyValue}`}
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
