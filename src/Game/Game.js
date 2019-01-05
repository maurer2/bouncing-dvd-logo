import React, { Component } from 'react';
import './Game.css';
import uid from 'uid';
import debounce from 'lodash.debounce';
import Playfield from '../Playfield/Playfield';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frames: 0,
      isRunning: false,
      framerate: 60,
      key: uid(6), // needed for reinitializing
      isFirstLoad: true,
    };

    this.stopGameLoop = this.stopGameLoop.bind(this);
    this.reset = this.reset.bind(this);
    this.togglePlayState = this.togglePlayState.bind(this);
    this.handleResize = debounce(this.handleResize.bind(this), 500);
  }

  handleResize() {
    this.reset();
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
    const gameLoop = setInterval(() => this.updateCounter(),
      Math.floor(1000 / this.state.framerate));

    this.setState({
      isRunning: true,
      gameLoop,
    });
  }

  stopGameLoop() {
    clearInterval(this.state.gameLoop);

    this.setState({
      gameLoop: null,
      isRunning: false,
    });
  }

  updateCounter() {
    const currentFrame = this.state.frames;
    const isNewFrame = (currentFrame !== 0 && (currentFrame % 60 === 0));

    if (isNewFrame) {
      this.setState({ frames: 0 });
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
    this.setState({ key: uid(6) });
  }

  render() {
    return (
      <div className={ `game ${!this.state.isRunning ? 'game--is-paused' : ''}`}
        ref={ (element) => { this.wapper = element; }} onClick={ this.togglePlayState } >
        <Playfield frames={ this.state.frames } key={ this.state.key } />
      </div>
    );
  }
}

export default Game;
