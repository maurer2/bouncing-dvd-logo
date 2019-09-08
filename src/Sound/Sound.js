import React, { Component, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import soundFile from './soundFile.wav';

const Sound = ({ playSound }) => {
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  const oldPlaySound = useRef(false);

  useEffect(() => {
    if (playSound === oldPlaySound.current) {
      return;
    }

    activateSound();
    oldPlaySound.current = playSound;
  }, [playSound]);

  function activateSound() {
    if (soundIsPlaying) {
      return;
    }

    setSoundIsPlaying(true);

    window.setTimeout(() => {
      setSoundIsPlaying(false);
    }, 1000);
  }

  if (!soundIsPlaying) {
    return null;
  }

  return (
    <>
      { soundIsPlaying && (
        <audio autoPlay>
          <source src={ soundFile } type="audio/wav" />
        </audio>
      )};
    </>
  );
};


Sound.propTypes = {
  playSound: PropTypes.bool,
};

export default Sound;
