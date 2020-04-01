import React, { useState, useRef, useEffect } from 'react';

import debounce from 'lodash.debounce';

import { nanoid } from 'nanoid';

import * as Styles from './Game.styles';
import PlayField from '../Playingfield/Playingfield';

const Game = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [keyValue, setKeyValue] = useState(() => `key-${nanoid(5)}`);
  const wrapperDomElement = useRef(null);
  const isInitialResize = useRef(true);
  const debouncedResizeHandler = useRef({});
  const resizeObserverIsSupported = useRef(() => !(window.ResizeObserver === undefined));
  const gameResizeObserver = useRef(new window.ResizeObserver((entries) => {
    const gameHasResized = entries.some((entry) => (entry.target === wrapperDomElement.current));

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
  const handleResize = () => reset();

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

    if (resizeObserverIsSupported.current) {
      gameResizeObserver.current.observe(wrapperDomElement.current);
    } else {
      window.addEventListener('resize', debouncedResizeHandler.current);
    }

    return () => {
      if (resizeObserverIsSupported.current) {
        gameResizeObserver.current.unobserve(wrapperDomElement.current);
      } else {
        window.removeEventListener('resize', debouncedResizeHandler.current);
      }
    };
  }, []);

  useEffect(() => {
    wrapperDomElement.current.focus();
  }, []);

  return (
    <Styles.GameWrapper
      isPaused={ isPaused }
      onClick={ togglePlayState }
      onKeyPress={ (event) => handleInput(event) }
      ref={ (element) => { wrapperDomElement.current = element; } }
      tabIndex="0"
      autoFocus={true}
    >
      <PlayField isPaused={ isPaused } key={ keyValue } />
    </Styles.GameWrapper>
  );
};

export default Game;
