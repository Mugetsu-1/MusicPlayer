import { useRef, useEffect, useCallback } from 'react';
import { PLAYER_CONFIG } from '../constants/config';

export const useAudioPlayer = (track, isPlaying, volume) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [track]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const play = useCallback(() => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
    }
  }, [isPlaying]);

  const pause = useCallback(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const seek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const seekFromStart = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > PLAYER_CONFIG.SEEK_THRESHOLD) {
      audioRef.current.currentTime = 0;
    }
  }, []);

  return {
    audioRef,
    play,
    pause,
    seek,
    seekFromStart
  };
};
