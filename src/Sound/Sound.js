import React from 'react';
// import PropTypes from 'prop-types';
import soundFile from './soundFile.wav';

const Sound = () => (
  <audio autoPlay>
    <source src={ soundFile } type="audio/wav" />
  </audio>
);

export default Sound;
