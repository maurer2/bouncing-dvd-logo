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
import { startGame, toggleSound } from '../Store2/actionCreators';
import type { Dispatch, RootState } from '../Store2/types';

import * as Styles from './Game.styles';
import type * as Types from './Game.types';

const Game: FC<Readonly<PropsWithChildren<Types.GameProps>>> = (): ReactElement => {
  const dispatch: Dispatch = useDispatch();
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const soundIsDisabled = useSelector((state: RootState) => state.soundIsDisabled);
  const [isPaused, setIsPaused] = useReducer<ReducerWithoutAction<boolean>>(
    (currentIsPaused) => !currentIsPaused,
    false,
  );
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
    setIsPaused();
  };

  function handleInput(event: KeyboardEvent<HTMLButtonElement>): void {
    const pressedKey = event.key;
    const observedKeys = [' ', 'k']; // " " === spacebar

    if (observedKeys.includes(pressedKey.toLowerCase())) {
      setIsPaused();
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
  useEffect(() => {
    dispatch(startGame());
  }, [dispatch]);

  // autofocus
  useEffect(() => {
    wrapperDomElement.current.focus();
  }, []);

  const toggleSoundCB = useCallback(() => {
    dispatch(toggleSound());
  }, [dispatch]);

  return (
    <StyleSheetManager disableVendorPrefixes>
      <Styles.GameWrapper
        ref={wrapperDomElement}
        tabIndex={0}
        data-testid="game-wrapper"
      >
        <PlayingField
          isPaused={isPaused}
          key={`key-${keyValue}`}
          data-testid="game-playingfield"
          data-key={`key-${keyValue}`}
        />
        <Styles.PauseButton
          tabIndex={-1}
          onClick={handleClick}
          onKeyPress={(event) => handleInput(event)}
          data-testid="game-pausebutton"
        >
          {isPaused ? 'Unpause' : 'Pause'}
        </Styles.PauseButton>
        <SoundTrigger
          soundIsDisabled={soundIsDisabled}
          toggleSound={toggleSoundCB}
        />
      </Styles.GameWrapper>
    </StyleSheetManager>
  );
};

export default Game;
