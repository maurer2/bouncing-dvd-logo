import React, { Component } from 'react';
import './Game.css';
import Playfield from '../Playfield/Playfield';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frames: 0,
      isRunning: false,
    };

    this.updateCounter = this.updateCounter.bind(this);
    this.togglePlayState = this.togglePlayState.bind(this);
    this.startGameLoop = this.startGameLoop.bind(this);
    this.stopGameLoop = this.stopGameLoop.bind(this);
  }

  componentDidMount() {
    this.startGameLoop();
  }

  componentWillUnmount() {
    this.stopGameLoop();
  }

  startGameLoop() {
    const gameLoop = setInterval(() => this.updateCounter(), Math.floor(1000 / 60));

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
    const isNewFrame = (currentFrame !== 0 && currentFrame % 60 === 0);

    if (isNewFrame) {
      this.setState({
        frames: 0,
      });
      return;
    }

    this.setState(previousState => ({
      frames: previousState.frames + 1,
    }));
  }

  togglePlayState() {
    if (this.state.isRunning) {
      this.stopGameLoop();
    } else {
      this.startGameLoop();
    }
  }

  render() {
    return (
      <div className={ `game ${!this.state.isRunning ? 'game--is-paused' : ''}`} onClick={ this.togglePlayState }>
        <Playfield frames={ this.state.frames } />
      </div>
    );
  }
}

export default Game;
