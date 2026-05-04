import React, { useEffect, useRef } from 'react';

import { useIsPlayingSound } from '../Store2';
import soundFile from '../assets/soundFile.wav';

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
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio
      data-testid="audio-tag"
      ref={audioDomElement}
      preload="auto"
      aria-label="Sound signal emitted by the species Felis catus during interaction with Homo sapiens"
    >
      <source
        src={soundFile}
        type="audio/wav"
        data-testid="audio-file"
      />
    </audio>
  );
}

export default SoundPlayer;
