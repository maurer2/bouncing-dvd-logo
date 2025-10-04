import React, { useState, useEffect, useRef, useEffectEvent, type FC } from 'react';

import soundFile from '../assets/soundFile.wav';

type SoundPlayerProps = {
  shouldTriggerSound: boolean;
};

const Sound: FC<SoundPlayerProps> = ({ shouldTriggerSound }) => {
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  const audioDomElement = useRef<HTMLAudioElement | null>(null);

  const onSoundStart = useEffectEvent(() => {
    // do not trigger new sound start while previous sound is playing
    if (!audioDomElement.current || soundIsPlaying) {
      return;
    }

    audioDomElement.current.currentTime = 0;
    audioDomElement.current.play();
  });

  useEffect(() => {
    if (shouldTriggerSound) {
      onSoundStart();
      setSoundIsPlaying(true);
      return;
    }
    setSoundIsPlaying(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps useEffectEvent not supported yet
  }, [shouldTriggerSound]);

  return (
    <audio
      data-testid="audio-tag"
      ref={audioDomElement}
      aria-label="Sound signal emitted by the species Felis catus during interaction with Homo sapiens"
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
