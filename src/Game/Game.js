import React, { Component } from 'react';

import uid from 'uid';
import debounce from 'lodash.debounce';
import styled from 'styled-components/macro';
import { Loop } from 'react-game-kit';

import Playfield from '../Playfield/Playfield';

const GameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  transition: filter 0.15s ease-in-out;
  cursor: pointer;

  ${props => (props.isPaused ? 'filter: opacity(0.25)' : 'filter: opacity(1)')};
`;

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRunning: true,
      key: uid(4), // needed for reinitializing
      isFirstLoad: true,
    };

    this.reset = this.reset.bind(this);
    this.togglePlayState = this.togglePlayState.bind(this);
    this.handleResize = debounce(this.handleResize.bind(this), 500);
  }

  componentDidMount() {
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

  togglePlayState() {
    this.setState(previousState => ({ isRunning: !previousState.isRunning }));
  }

  reset() {
    this.setState({ key: uid(4) });
  }

  handleResize() {
    this.reset();
  }

  render() {
    return (
      <Loop>
        <GameWrapper
          isPaused={ !this.state.isRunning }
          onClick={ this.togglePlayState }
          ref={ (element) => { this.wapper = element; }}
        >
          <Playfield isPaused={ !this.state.isRunning } key={ this.state.key } />
        </GameWrapper>
      </Loop>
    );
  }
}

export default Game;
