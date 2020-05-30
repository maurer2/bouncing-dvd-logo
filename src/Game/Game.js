import React, { useState, useRef, useEffect, useCallback } from 'react';

import debounce from 'lodash.debounce';

import { nanoid } from 'nanoid';

import { StyleSheetManager } from 'styled-components/macro';
import * as Styles from './Game.styles';
import PlayField from '../Playingfield/Playingfield';

const Game = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [keyValue, setKeyValue] = useState(() => `key-${nanoid(5)}`);
  const wrapperDomElement = useRef(null);
  const isInitialResize = useRef(true);
  const debouncedResizeHandler = useRef({});

  const gameResizeObserver = useRef(new window.ResizeObserver((entries) => {
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

  const togglePlayState = () => setIsPaused(!isPaused);
  const reset = () => setKeyValue(() => `key-${nanoid(5)}`);
  const handleResize = useCallback(() => reset(), []);

  const handleInput = (event) => {
    const pressedKey = event.key || event.keyCode;
    const observedKeys = [' ', 'k']; // " " === spacebar

    if (observedKeys.includes(pressedKey.toLowerCase())) {
      togglePlayState();
    }
  };

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
        onClick={ togglePlayState }
        onKeyPress={ (event) => handleInput(event) }
        ref={ (element) => { wrapperDomElement.current = element; } }
        tabIndex="0"
        autoFocus={true}
      >
        <PlayField isPaused={ isPaused } key={ keyValue } />
      </Styles.GameWrapper>
    </StyleSheetManager>
  );
};

export default Game;
