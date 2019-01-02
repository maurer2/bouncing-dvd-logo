import React, { Component } from 'react';
import './Game.css';
import Playfield from '../Playfield/Playfield';
import uid from 'uid';

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
    this.resetPlayfield = this.resetPlayfield.bind(this);
  }

  componentDidMount() {
    this.startGameLoop();
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

  resetPlayfield() {
    this.setState({ key: uid(6) });
  }

  render() {
    return (
      <div className={ `game ${!this.state.isRunning ? 'game--is-paused' : ''}`} onClick={ this.resetPlayfield }>
        <Playfield frames={ this.state.frames } key={ this.state.key } />
      </div>
    );
  }
}

export default Game;
