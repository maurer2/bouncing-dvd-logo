import React from 'react';
import PropTypes from 'prop-types';
import soundFile from './soundFile.wav';

const Sound = ({ playState }) => {
  if (!playState) {
    return null;
  }

  return (
    <audio autoPlay>
      <source src={ soundFile } type="audio/wav" />
    </audio>
  );
};


Sound.propTypes = {
  playState: PropTypes.bool,
};

export default Sound;
