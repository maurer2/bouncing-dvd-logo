import React, { Component } from 'react';
import './Game.css';
import uid from 'uid';
import Playfield from '../Playfield/Playfield';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frames: 0,
      isRunning: false,
      framerate: 60,
      key: uid(6), // needed for reinitializing
    };

    this.stopGameLoop = this.stopGameLoop.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.startGameLoop();

    if (window.ResizeObserver === undefined) {
      return;
    }

    // Register observer
    const gameResizeObserver = new window.ResizeObserver((entries) => {
      const gameHasResized = entries.some(entry => entry.target === this.wapper);

      if (gameHasResized) {
        this.reset();
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
        ref={ (element) => { this.wapper = element; }} onClick={ this.reset } >
        <Playfield frames={ this.state.frames } key={ this.state.key } />
      </div>
    );
  }
}

export default Game;
