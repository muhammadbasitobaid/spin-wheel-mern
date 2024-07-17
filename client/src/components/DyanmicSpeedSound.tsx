import React, { useRef, useEffect } from "react";
import { Howl } from "howler";

interface DynamicSpeedSoundProps {
  audioSrc: string;
  duration: number;
  isPlaying?: boolean;
  onEnd?: () => void;
}

const DynamicSpeedSound: React.FC<DynamicSpeedSoundProps> = ({
  audioSrc,
  duration,
  isPlaying = false,
  onEnd,
}) => {
  const soundRef = useRef<Howl | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const sound = new Howl({
      src: [audioSrc],
      loop: true,
      onplay: () => {
        startPlaybackRateAdjustment();
      },
    });

    soundRef.current = sound;

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [audioSrc]);

  useEffect(() => {
    if (isPlaying) {
      playSound();
    } else if (soundRef.current) {
      soundRef.current.stop();
    }
  }, [isPlaying]);

  const playSound = () => {
    const sound = soundRef.current;
    if (!sound) return;

    startTimeRef.current = performance.now();
    sound.play();
  };

  const startPlaybackRateAdjustment = () => {
    const sound = soundRef.current;
    if (!sound) return;

    const adjustPlaybackRate = () => {
      const startTime = startTimeRef.current;
      if (startTime === null) return;

      const elapsed = performance.now() - startTime;
      const progress = elapsed / duration;

      if (progress >= 1) {
        sound.stop();
        if (onEnd) {
          onEnd();
        }
        return;
      }

      const playbackRate = calculatePlaybackRate(progress);
      sound.rate(playbackRate);

      animationFrameIdRef.current = requestAnimationFrame(adjustPlaybackRate);
    };

    adjustPlaybackRate();
  };

  const calculatePlaybackRate = (progress: number) => {
    if (progress < 0.5) {
      return 1 + 2 * progress; // Speed up from 1x to 2x
    } else {
      return 3 - 2 * progress; // Slow down from 2x to 1x
    }
  };

  return <div></div>;
};

export default DynamicSpeedSound;
