import React, {
  useState, useEffect, useRef, useContext, FC,
} from 'react';
import PropTypes from 'prop-types';

import Store from '../Store';

import soundFile from './soundFile.wav';
import * as Types from './Sound.types';


const Sound: FC<Readonly<Types.SoundProps>> = ({ playSound }): JSX.Element => {
  const { soundIsDisabled } = useContext(Store);
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  const prevPlaySound = useRef(false);

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

    prevPlaySound.current = playSound;
  }, [playSound, soundIsDisabled]);

  return (
    soundIsPlaying && (
      <audio autoPlay>
        <source src={soundFile} type="audio/wav" />
      </audio>
    )
  );
};

const { bool } = PropTypes;

Sound.propTypes = { playSound: bool.isRequired };

export default Sound;
