import React, { useEffect, useRef } from 'react';

import soundFileCaptions from '../assets/soundFile.vtt';
import soundFile from '../assets/soundFile.wav';
import { useIsPlayingSound } from '../Store';

function SoundPlayer() {
  const isPlayingSound = useIsPlayingSound();
  const audioDomElement = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPlayingSound && audioDomElement.current) {
      audioDomElement.current.currentTime = 0;
      audioDomElement.current.play().catch((error: unknown) => {
        console.error('Error playing sound', error);
      });
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
