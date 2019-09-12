import React, { useState, useRef, useEffect } from 'react';

import uid from 'uid';
import styled from 'styled-components/macro';
import { Loop } from 'react-game-kit';
import debounce from 'lodash.debounce';

import Playfield from '../Playfield/Playfield';

const GameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  transition: filter 0.15s ease-in-out;
  cursor: pointer;

  ${props => (props.isPaused ? 'filter: opacity(0.25)' : 'filter: opacity(1)')};
`;

const Game = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [keyValue, setKeyValue] = useState(() => uid(4));
  // const resizeObserverIsSupported = useRef(() => !(window.ResizeObserver === undefined));
  // const gameResizeObserver = useRef({});
  const wrapperDomElement = useRef(null);

  // required for removing
  const resizeHandler = useRef(null);

  const togglePlayState = () => setIsRunning(!isRunning);

  const reset = () => {
    setKeyValue(() => uid(4));
  };

  const handleResize = () => {
    reset();
  };

  // const handleResize = () => reset()

  // setup intersection observer
  /*
  useEffect(() => {
    if (!resizeObserverIsSupported.current) {
      return;
    }

    gameResizeObserver.current = new window.ResizeObserver((entries) => {
      // ignore resize observers from other observed entries
      const gameHasResized = entries.some(entry => (entry.target === wrapperDomElement.current));

      if (gameHasResized) {
        // handleResize();
      }
    });

    // gameResizeObserver.current.observe(wrapperDomElement.current);

    // eslint-disable-next-line
    return () => {
      if (resizeObserverIsSupported.current) {
        gameResizeObserver.current.unobserve(wrapperDomElement.current);
      }
    };
  }, []);
  */

  // setup throttled resize handler
  useEffect(() => {
    const throttledResizeHandler = debounce(handleResize, 300);

    window.addEventListener('resize', throttledResizeHandler);

    resizeHandler.current = throttledResizeHandler;

    return () => {
      window.removeEventListener('resize', throttledResizeHandler);
    };
  }, []);

  return (
    <Loop>
      <GameWrapper
        isPaused={ !isRunning }
        onClick={ togglePlayState }
        ref={ (element) => { wrapperDomElement.current = element; } }
      >
        <Playfield isPaused={ !isRunning } key={ keyValue } />
      </GameWrapper>
    </Loop>
  );
};

export default Game;
