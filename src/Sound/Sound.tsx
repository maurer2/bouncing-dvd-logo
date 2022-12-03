import React, { useState, useEffect, useRef } from 'react';
import type { FC, ReactElement } from 'react';

import soundFile from '../assets/soundFile.wav';

import type * as Types from './Sound.types';

const Sound: FC<Readonly<Types.SoundProps>> = ({ shouldTriggerSound }): ReactElement => {
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  const prevPlaySound = useRef(false);

  useEffect(() => {
    // do not trigger new sound start while previous sound is playing
    if (shouldTriggerSound && shouldTriggerSound !== prevPlaySound.current) {
      setSoundIsPlaying(true);

      window.setTimeout(() => {
        setSoundIsPlaying(false);
      }, 800);
    }

    prevPlaySound.current = shouldTriggerSound;
  }, [shouldTriggerSound]);

  if (!soundIsPlaying) {
    return null;
  }

  return (
    <audio
      autoPlay
      data-testid="audio-tag"
    >
      <source
        src={soundFile}
        type="audio/wav"
        data-testid="audio-file"
      />
    </audio>
  );
};

export default Sound;
