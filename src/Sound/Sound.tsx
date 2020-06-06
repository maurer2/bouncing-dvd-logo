import React, {
  useState, useEffect, useRef, useContext, FC,
} from 'react';
import PropTypes from 'prop-types';

import Store from '../Store';

import soundFile from './soundFile.wav';
import * as Types from './Sound.types';


const Sound: FC<Types.SoundProps> = ({ playSound }): JSX.Element => {
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

    (prevPlaySound as any).current = prevPlaySound;
  }, [playSound, soundIsDisabled]);

  return (
    <>
      {soundIsPlaying
        ? (
          <audio autoPlay>
            <source src={soundFile} type="audio/wav" />
          </audio>
        )
        : null}
    </>
  );
};

const { bool } = PropTypes;

Sound.propTypes = { playSound: bool.isRequired };

export default Sound;
