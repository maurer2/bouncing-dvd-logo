import React, { Component } from 'react';
import PropTypes from 'prop-types';
import soundFile from './soundFile.wav';

class Sound extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      soundIsPlaying: false,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playSound !== this.props.playSound) {
      this.playSound();
    }
  }

  playSound() {
    if (this.state.soundIsPlaying) {
      return;
    }

    this.setState({ soundIsPlaying: true });

    window.setTimeout(() => {
      this.setState({ soundIsPlaying: false });
    }, 1000);
  }

  render() {
    if (!this.state.soundIsPlaying) {
      return null;
    }

    return (
      <audio autoPlay>
        <source src={ soundFile } type="audio/wav" />
      </audio>
    );
  }
}

Sound.propTypes = {
  playSound: PropTypes.bool,
};

export default Sound;
