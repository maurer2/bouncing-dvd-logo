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
    }, 800);
  };

  useEffect(() => {
    let { current: oldplaySoundValue } = playSoundPrev;

    if (playSound === oldplaySoundValue) {
      return;
    }

    activateSound();
    oldplaySoundValue = playSound;
  }, [playSound, soundIsPlaying]);

  if (!soundIsPlaying) {
    return null;
  }

  return (
    <>
      { soundIsPlaying && (
        <audio autoPlay>
          <source src={ soundFile } type="audio/wav" />
        </audio>
      )}
    </>
  );
};

const { bool } = PropTypes;

Sound.propTypes = {
  playSound: bool,
};

export default Sound;
