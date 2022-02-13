import React, {
  useState, useRef, useEffect, useCallback, VFC, KeyboardEvent, MouseEvent,
} from 'react';
import { debounce } from 'lodash-es';
import generate from 'nanoid-generate';
import { StyleSheetManager } from 'styled-components';

import PlayField from '../Playingfield/Playingfield';

import * as Styles from './Game.styles';
import * as Types from './Game.types';

const Game: VFC<Readonly<Types.GameProps>> = (): JSX.Element => {
  const [isPaused, setIsPaused] = useState(false);
  const [keyValue, setKeyValue] = useState<string>(() => generate.lowercase(5));
  const wrapperDomElement = useRef<HTMLElement>(null);
  const isInitialResize = useRef(true);
  const debouncedResizeHandler = useRef<ReturnType<typeof debounce>>(null);

  const gameResizeObserver = useRef<ResizeObserver>(new window.ResizeObserver((entries) => {
    const gameHasResized = entries.some((entry) => (entry.target === wrapperDomElement.current));

    // ignore resize observer on dom load
    if (isInitialResize.current) {
      isInitialResize.current = false;

      return;
    }

    if (gameHasResized) {
      debouncedResizeHandler.current();
    }
  }));

  const togglePlayState = () => setIsPaused((currentIsPaused) => !currentIsPaused);
  const resetGame = () => setKeyValue(() => generate.lowercase(5));
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

  useEffect(() => {
    wrapperDomElement.current.focus();
  }, []);

  return (
    <StyleSheetManager disableVendorPrefixes>
      <Styles.GameWrapper
        onClick={(event) => handleClick(event)}
        onKeyPress={(event) => handleInput(event)}
        ref={(element) => { wrapperDomElement.current = element; }}
        tabIndex="0"
        autoFocus
        data-testid="game-wrapper"
      >
        <PlayField isPaused={isPaused} key={keyValue} data-testid="game-playfield" />
      </Styles.GameWrapper>
    </StyleSheetManager>
  );
};

export default Game;
