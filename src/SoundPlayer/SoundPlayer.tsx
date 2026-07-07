import React, { useEffect, useRef } from 'react';

import { useIsPlayingSound } from '../Store';
import soundFile from '../assets/soundFile.wav';
import soundFileCaptions from '../assets/soundFile.vtt';

function SoundPlayer() {
  const isPlayingSound = useIsPlayingSound();
  const audioDomElement = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlayingSound && audioDomElement.current) {
      audioDomElement.current.currentTime = 0;
      audioDomElement.current.play();
    }
  }, [isPlayingSound]);

  return (
    <audio
      ref={audioDomElement}
      preload="auto"
      aria-label="Meow sound"
    >
      <source
        src={soundFile}
        type="audio/wav"
        data-testid="audio-file"
      />
      <track
        kind="captions"
        src={soundFileCaptions}
        data-testid="subtitles-file"
        default
      />
    </audio>
  );
}

export default SoundPlayer;
