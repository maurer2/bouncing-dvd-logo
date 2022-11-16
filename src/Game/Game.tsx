import type {
  FC,
  KeyboardEvent,
  ReactElement,
  ReducerWithoutAction,
  PropsWithChildren,
} from 'react';
import React, { useRef, useEffect, useReducer } from 'react';
import { debounce } from 'lodash-es';
import { nanoid } from 'nanoid';
import { StyleSheetManager } from 'styled-components';

import SoundTrigger from '../SoundTrigger/SoundTrigger';
import PlayingField from '../Playingfield/Playingfield';

import * as Styles from './Game.styles';
import type * as Types from './Game.types';

const Game: FC<Readonly<PropsWithChildren<Types.GameProps>>> = (): ReactElement => {
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

  // setup resize/intersection observer
  useEffect(() => {
    debouncedResizeHandler.current = debounce(setKeyValue, 300);

    const currentResizeObserver: ResizeObserver = gameResizeObserver.current;
    const currentDomElement = wrapperDomElement.current;

    if (!currentDomElement) {
      return undefined;
    }
    currentResizeObserver.observe(currentDomElement);

    return () => {
      currentResizeObserver.unobserve(currentDomElement);
    };
  }, []);

  // autofocus
  useEffect(() => {
    wrapperDomElement.current.focus();
  }, []);

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
        <SoundTrigger />
      </Styles.GameWrapper>
    </StyleSheetManager>
  );
};

export default Game;
