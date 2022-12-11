import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { FC, ReactElement } from 'react';

import soundFile from '../assets/soundFile.wav';

import type * as Types from './SoundPlayer.types';

const Sound: FC<Readonly<Types.SoundPlayerProps>> = ({ shouldTriggerSound }): ReactElement => {
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  const audioDomElement = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback(() => {
    // do not trigger new sound start while previous sound is playing
    if (!audioDomElement.current || soundIsPlaying) {
      return;
    }

    audioDomElement.current.currentTime = 0;
    audioDomElement.current.play();
  }, [soundIsPlaying]);

  useEffect(() => {
    if (shouldTriggerSound) {
      playSound();
      setSoundIsPlaying(true);
      return;
    }
    setSoundIsPlaying(false);
  }, [shouldTriggerSound, playSound]);

  return (
    <audio
      data-testid="audio-tag"
      ref={audioDomElement}
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
