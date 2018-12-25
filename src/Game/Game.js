import React, { Component } from 'react';
import './Game.css';
import Playfield from '../Playfield/Playfield';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      frames: 0,
    };

    this.updateCounter = this.updateCounter.bind(this);
  }

  updateCounter() {
    const currentFrame = this.state.frames;
    const isNewFrame = (currentFrame !== 0 && currentFrame % 30 === 0);

    if (isNewFrame) {
      this.setState(previousState => ({
        frames: 0,
      }));
    } else {
      this.setState(previousState => ({
        frames: previousState.frames + 1,
      }));
    }

    console.log(this.state.frames);
  }

  componentDidMount() {
    const gameLoop = setInterval(() => this.updateCounter(), Math.floor(1000/60));

    this.setState({
      gameLoop
    });
  }

  componentWillUnmount() {
    clearInterval(this.gameLoop);

    this.setState({
      gameLoop: null,
    });
  }

  render() {
    return (
      <Playfield updateField={ this.state.frames === 0 } />
    );
  }
}

export default Game;
