import React, { useRef, useEffect } from "react";
import { Howl } from "howler";

interface SoundPlayerProps {
  audioSrc: string;
  isPlaying?: boolean;
  onEnd?: () => void;
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({
  audioSrc,
  isPlaying = false,
  onEnd,
}) => {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    const sound = new Howl({
      src: [audioSrc],
      onend: onEnd,
    });

    soundRef.current = sound;

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
    };
  }, [audioSrc, onEnd]);

  useEffect(() => {
    if (isPlaying) {
      soundRef.current?.play();
    } else {
      soundRef.current?.stop();
    }
  }, [isPlaying]);

  return null;
};

export default SoundPlayer;
