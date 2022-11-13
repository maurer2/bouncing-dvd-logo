import type { FC, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { debounce } from 'lodash-es';
import { nanoid } from 'nanoid';
import { StyleSheetManager } from 'styled-components';

import PlayingField from '../Playingfield/Playingfield';

import * as Styles from './Game.styles';
import type * as Types from './Game.types';

const Game: FC<Readonly<Types.GameProps>> = (): ReactElement => {
  const [isPaused, setIsPaused] = useState(false);
  const [keyValue, setKeyValue] = useState<string>(nanoid(10));
  const wrapperDomElement = useRef<HTMLElement>(null);
  const isInitialResize = useRef(true);
  const debouncedResizeHandler = useRef<ReturnType<typeof debounce>>(null);

  const gameResizeObserver = useRef(
    new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const gameHasResized = entries.some((entry) => entry.target === wrapperDomElement.current);

      // ignore resize observer on dom load
      if (isInitialResize.current) {
        isInitialResize.current = false;

        return;
      }

      if (gameHasResized) {
        debouncedResizeHandler.current();
      }
    }),
  );

  const togglePlayState = () => setIsPaused((currentIsPaused) => !currentIsPaused);
  const resetGame = () => setKeyValue(() => nanoid(10));
  const handleResize = useCallback(() => resetGame(), []);

  function handleClick(event: MouseEvent<HTMLDivElement>): void {
    event.preventDefault();
    togglePlayState();
  }

  function handleInput(event: KeyboardEvent<HTMLDivElement>): void {
    const pressedKey = event.key;
    const observedKeys = [' ', 'k']; // " " === spacebar

    if (observedKeys.includes(pressedKey.toLowerCase())) {
      togglePlayState();
    }
  }

  // setup resize/intersection observer
  useEffect(() => {
    debouncedResizeHandler.current = debounce(handleResize, 300);

    const currentResizeObserver = gameResizeObserver.current;

    currentResizeObserver.observe(wrapperDomElement.current);

    return () => {
      currentResizeObserver.unobserve(wrapperDomElement.current);
    };
  }, [handleResize]);

  // autofocus
  useEffect(() => {
    wrapperDomElement.current.focus();
  }, []);

  return (
    <StyleSheetManager disableVendorPrefixes>
      <Styles.GameWrapper
        onClick={(event) => handleClick(event)}
        onKeyPress={(event) => handleInput(event)}
        ref={(element) => {
          wrapperDomElement.current = element;
        }}
        tabIndex={0}
        data-testid="game-wrapper"
      >
        <PlayingField
          isPaused={isPaused}
          key={`key-${keyValue}`}
          data-testid="game-playfield"
          data-key={`key-${keyValue}`}
        />
      </Styles.GameWrapper>
    </StyleSheetManager>
  );
};

export default Game;
