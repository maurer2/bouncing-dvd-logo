import React, {
  useState, useEffect, useRef, useContext, FC,
} from 'react';
import PropTypes from 'prop-types';

import Store from '../Store';
import soundFile from '../assets/soundFile.wav';

import * as Types from './Sound.types';

const Sound: FC<Readonly<Types.SoundProps>> = ({ triggerSound }): JSX.Element => {
  const { soundIsDisabled } = useContext(Store);
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  const prevPlaySound = useRef(false);

  useEffect(() => {
    if (soundIsDisabled) {
      return;
    }

    // do not trigger new sound start while previous sound is playing
    if (triggerSound && triggerSound !== prevPlaySound.current) {
      setSoundIsPlaying(true);

      window.setTimeout(() => {
        setSoundIsPlaying(false);
      }, 800);
    }

    prevPlaySound.current = triggerSound;
  }, [triggerSound, soundIsDisabled]);

  if (soundIsDisabled || !soundIsPlaying) {
    return null;
  }

  return (
    <audio autoPlay data-testid="audio-tag">
      <source
        src={soundFile}
        type="audio/wav"
        data-testid="audio-file"
      />
    </audio>
  );
};

const { bool } = PropTypes;

Sound.propTypes = { triggerSound: bool.isRequired };

export default Sound;
