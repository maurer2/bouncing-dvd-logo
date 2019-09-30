import React, { useState, useRef, useEffect } from 'react';

import uid from 'uid';
import styled from 'styled-components/macro';
import debounce from 'lodash.debounce';

import Playfield from '../Playfield/Playfield';

const GameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  transition: filter 0.15s ease-in-out;
  cursor: pointer;
  color: white;

  ${props => (props.isPaused ? 'filter: opacity(0.25)' : 'filter: opacity(1)')};
`;

const Game = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [keyValue, setKeyValue] = useState(() => uid(4));
  const gameResizeObserver = useRef({});
  const wrapperDomElement = useRef(null);

  const togglePlayState = () => setIsPaused(!isPaused);

  const reset = () => setKeyValue(() => uid(4));

  const handleResize = () => reset();

  // setup resize/intersection observer
  useEffect(() => {
    const debouncedResizeHandler = debounce(handleResize, 300);
    const resizeObserverIsSupported = !(window.ResizeObserver === undefined);

    if (resizeObserverIsSupported) {
      let isFirstTime = true; // ignore inital call on page load

      gameResizeObserver.current = new window.ResizeObserver((entries) => {
        const gameHasResized = entries.some(entry => (entry.target === wrapperDomElement.current));

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

  return (
    <GameWrapper
      isPaused={ isPaused }
      onClick={ togglePlayState }
      ref={ (element) => { wrapperDomElement.current = element; } }
    >
      <Playfield isPaused={ isPaused } key={ keyValue } />
    </GameWrapper>
  );
};

export default Game;
