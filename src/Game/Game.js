import React, { Component } from 'react';

import uid from 'uid';
import debounce from 'lodash.debounce';
import styled from 'styled-components/macro';

import Playfield from '../Playfield/Playfield';

// import './Game.css';

const GameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  transition: filter 0.25s ease-in-out;

  ${props => (props.isPaused ? 'filter: opacity(0.1)' : 'filter: opacity(1);')};
`;

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frames: 1,
      isRunning: false,
      framerate: 60,
      key: uid(4), // needed for reinitializing
      isFirstLoad: true,
      gameLoopID: -1,
    };

    this.stopGameLoop = this.stopGameLoop.bind(this);
    this.reset = this.reset.bind(this);
    this.togglePlayState = this.togglePlayState.bind(this);
    this.handleResize = debounce(this.handleResize.bind(this), 500);
  }

  componentDidMount() {
    this.startGameLoop();

    if (window.ResizeObserver === undefined) {
      return;
    }

    // Register observer
    const gameResizeObserver = new window.ResizeObserver((entries) => {
      const gameHasResized = entries.some(entry => entry.target === this.wapper);

      if (this.state.isFirstLoad) {
        this.setState({ isFirstLoad: false });

        return;
      }

      if (gameHasResized) {
        this.handleResize();
      }
    });

    gameResizeObserver.observe(this.wapper);
  }

  componentWillUnmount() {
    this.stopGameLoop();
  }

  startGameLoop() {
    const gameLoopID = setInterval(() => this.updateCounter(),
      Math.floor(1000 / this.state.framerate));

    this.setState({
      isRunning: true,
      gameLoopID,
    });
  }

  stopGameLoop() {
    clearInterval(this.state.gameLoopID);

    this.setState({
      gameLoopID: -1,
      isRunning: false,
    });
  }

  updateCounter() {
    const isNewFrame = this.state.frames % this.state.framerate === 0;

    if (isNewFrame) {
      this.setState({ frames: 1 });
      return;
    }

    this.setState(previousState => ({ frames: previousState.frames + 1 }));
  }

  togglePlayState() {
    if (this.state.isRunning) {
      this.stopGameLoop();

      return;
    }

    this.startGameLoop();
  }

  reset() {
    this.setState({ key: uid(4) });
  }

  handleResize() {
    this.reset();
  }

  render() {
    return (
      <GameWrapper isPaused={ !this.state.isRunning } ref={ (element) => { this.wapper = element; }}
        onClick={ this.togglePlayState } >
        <Playfield frames={ this.state.frames } key={ this.state.key } />
      </GameWrapper>
    );
  }
}

export default Game;
