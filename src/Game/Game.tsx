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

import SoundTrigger from '../SoundTrigger/SoundTrigger';
import PlayingField from '../Playingfield/Playingfield';
import { startGame, toggleSound, togglePlayState, triggerCollision } from '../Store2/actionCreators';
import { getSoundState, getPlayState } from '../Store2/selectors'
import type { Dispatch } from '../Store2/types';

import * as Styles from './Game.styles';
import type * as Types from './Game.types';

const Game: FC<Readonly<PropsWithChildren<Types.GameProps>>> = (): ReactElement => {
  const dispatch: Dispatch = useDispatch();
  const soundIsDisabled = useSelector(getSoundState);
  const isPaused = useSelector(getPlayState)
  const [keyValue, setKeyValue] = useReducer<ReducerWithoutAction<string>>(
    () => nanoid(10),
    nanoid(10),
  );
  const wrapperDomElement = useRef<HTMLDivElement>(null);
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
    // dispatch(togglePlayState());
  };

  function handleInput(event: KeyboardEvent<HTMLButtonElement>): void {
    const observedKeys = [' ', 'k']; // " " === spacebar

    if (observedKeys.includes(event.key.toLowerCase())) {
      dispatch(togglePlayState());
    }
  }

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

  // init redux
  // useEffect(() => {
    // dispatch(startGame());
  // }, [dispatch]);

  // autofocus
  useEffect(() => {
    wrapperDomElement.current.focus();
  }, []);

  const toggleSoundCB = useCallback(() => {
    dispatch(toggleSound());
  }, [dispatch]);

  const triggerCollisionCB = useCallback(() => {
    dispatch(triggerCollision());
  }, [dispatch]);

  return (
    <StyleSheetManager disableVendorPrefixes>
      <Styles.GameWrapper
        ref={wrapperDomElement}
        tabIndex={0}
        data-testid="game-wrapper"
      >
        <PlayingField
          // isPaused={isPaused}
          triggerCollision={triggerCollisionCB}
          key={`key-${keyValue}`}
          data-testid="game-playingfield"
          data-key={`key-${keyValue}`}
        />
        {/* <Styles.PauseButton
          tabIndex={-1}
          onClick={handleClick}
          onKeyPress={(event) => handleInput(event)}
          data-testid="game-pausebutton"
        >
          {isPaused ? 'Unpause' : 'Pause'}
        </Styles.PauseButton> */}
        <SoundTrigger
          soundIsDisabled={soundIsDisabled}
          toggleSound={toggleSoundCB}
        />
      </Styles.GameWrapper>
    </StyleSheetManager>
  );
};

export default Game;
