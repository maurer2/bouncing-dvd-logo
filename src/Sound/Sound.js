import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import soundFile from './soundFile.wav';

import Store from '../Store';

const Sound = ({ playSound }) => {
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  const prevPlaySound = useRef(false);
  const { soundIsDisabled } = useContext(Store);

  useEffect(() => {
    if (soundIsDisabled) {
      return;
    }

    if (playSound && playSound !== prevPlaySound.current) {
      setSoundIsPlaying(true);

      window.setTimeout(() => {
        setSoundIsPlaying(false);
      }, 800);
    }

    prevPlaySound.current = prevPlaySound;
  }, [playSound, soundIsDisabled]);

  return (
    <>
      {soundIsPlaying
        ? (
          <audio autoPlay>
            <source src={ soundFile } type="audio/wav" />
          </audio>
        )
        : null
      }
    </>
  );
};

const { bool } = PropTypes;

Sound.propTypes = {
  playSound: bool,
};

export default Sound;
