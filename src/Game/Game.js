import React, { useState, useRef, useEffect } from 'react';

import uid from 'uid';
import debounce from 'lodash.debounce';

import * as Styles from './Game.styles';
import PlayField from '../Playingfield/Playingfield';

const Game = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [keyValue, setKeyValue] = useState(() => uid(4));
  const gameResizeObserver = useRef();
  const wrapperDomElement = useRef(null);

  const togglePlayState = () => setIsPaused(!isPaused);

  const reset = () => setKeyValue(() => uid(4));

  const handleResize = () => reset();

  const handleInput = (event) => {
    const pressedKey = event.key || event.keyCode;
    const observedKeys = [' ', 'k', 'K']; // " " === spacebar

    if (observedKeys.includes(pressedKey)) {
      togglePlayState();
    }
  };

  // setup resize/intersection observer
  useEffect(() => {
    const debouncedResizeHandler = debounce(handleResize, 300);
    const resizeObserverIsSupported = !(window.ResizeObserver === undefined);

    if (resizeObserverIsSupported) {
      let isFirstTime = true; // ignore initial call on page load

      gameResizeObserver.current = new window.ResizeObserver((entries) => {
        const gameHasResized = entries.some((entry) => (entry.target === wrapperDomElement.current));

        if (isFirstTime) {
          isFirstTime = false;
          return;
        }

        if (gameHasResized) {
          debouncedResizeHandler();
        }
      });
      gameResizeObserver.current.observe(wrapperDomElement.current);
    } else {
      window.addEventListener('resize', debouncedResizeHandler);
    }

    return () => {
      if (resizeObserverIsSupported) {
        gameResizeObserver.current.unobserve(wrapperDomElement.current);
      } else {
        window.removeEventListener('resize', debouncedResizeHandler);
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
    >
      <PlayField isPaused={ isPaused } key={ keyValue } />
    </Styles.GameWrapper>
  );
};

export default Game;
