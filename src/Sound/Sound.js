import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import soundFile from './soundFile.wav';

const Sound = ({ playSound }) => {
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  const playSoundPrev = useRef(false);

  const activateSound = () => {
    if (soundIsPlaying) {
      return;
    }

    setSoundIsPlaying(true);

    window.setTimeout(() => {
      setSoundIsPlaying(false);
    }, 1000);
  };

  useEffect(() => {
    let { current: oldplaySoundValue } = playSoundPrev;

    if (playSound === oldplaySoundValue) {
      return;
    }

    activateSound();
    oldplaySoundValue = playSound;
  }, [playSound]);

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
