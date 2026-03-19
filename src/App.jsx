import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, File, Music } from 'lucide-react';
import StarfieldBackground from './components/StarfieldBackground';
import PlayerControls from './components/PlayerControls';
import ProgressBar from './components/ProgressBar';
import TrackList from './components/TrackList';
import CornerDecoration from './components/CornerDecoration';
import FileActionButton from './components/FileActionButton';
import { loadTracksFromStorage, saveTracksToStorage, getTrackSource } from './utils/trackUtils';
import { STORAGE_KEY, UI_STRINGS } from './constants/strings';
import { PLAYER_CONFIG, ANIMATION_CONFIG } from './constants/config';
import { GLOW_EFFECTS } from './constants/effects';
import './index.css';

function App() {
  const [tracks, setTracks] = useState(() => loadTracksFromStorage(STORAGE_KEY));
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(PLAYER_CONFIG.DEFAULT_VOLUME);
  const [isShuffled, setIsShuffled] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = useMemo(() => tracks[currentTrackIndex] || null, [tracks, currentTrackIndex]);

  useEffect(() => {
    saveTracksToStorage(STORAGE_KEY, tracks);
  }, [tracks]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleTrackEnd = useCallback(() => {
    if (tracks.length === 0) return;
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    }
    setIsPlaying(true);
  }, [tracks.length, isShuffled]);

  const handlePlayPause = useCallback(() => {
    if (!currentTrack || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [currentTrack, isPlaying]);

  const handleNext = useCallback(() => {
    if (tracks.length === 0) return;
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    }
    setIsPlaying(true);
  }, [tracks.length, isShuffled]);

  const handlePrevious = useCallback(() => {
    if (tracks.length === 0) return;
    if (currentTime > PLAYER_CONFIG.SEEK_THRESHOLD && audioRef.current) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    }
    setIsPlaying(true);
  }, [tracks.length, currentTime]);

  const handleShuffle = useCallback(() => {
    setIsShuffled(!isShuffled);
  }, [isShuffled]);

  const handleSeek = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const handleTrackSelect = useCallback((index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  }, []);

  const isElectron = typeof window !== 'undefined' && window.electronAPI;

  const handleOpenFiles = useCallback(async () => {
    if (isElectron) {
      const newTracks = await window.electronAPI.openFiles();
      if (newTracks.length > 0) {
        setTracks((prevTracks) => [...prevTracks, ...newTracks]);
      }
    }
  }, [isElectron]);

  const handleOpenFolder = useCallback(async () => {
    if (isElectron) {
      const newTracks = await window.electronAPI.openFolder();
      if (newTracks.length > 0) {
        setTracks((prevTracks) => [...prevTracks, ...newTracks]);
      }
    }
  }, [isElectron]);

  const visualizerGlow = useMemo(() => {
    return isPlaying
      ? [GLOW_EFFECTS.MAGENTA_STRONG, GLOW_EFFECTS.ACTIVE_STRONG, GLOW_EFFECTS.MAGENTA_STRONG]
      : GLOW_EFFECTS.MAGENTA_LIGHT;
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-cyber-darker text-star-white overflow-hidden cyber-grid relative">
      <div className="fixed inset-0 pointer-events-none scanlines z-50" />

      <StarfieldBackground />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_CONFIG.FADE_IN }}
          className="w-full max-w-4xl"
        >
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-cyber text-4xl md:text-5xl font-bold mb-2 text-neon-cyan text-glow-cyan tracking-wider">
              {UI_STRINGS.PLAYER_TITLE}
            </h1>
            <p className="text-neon-magenta/80 font-medium tracking-widest uppercase text-sm">
              {UI_STRINGS.PLAYER_SUBTITLE}
            </p>

            {isElectron && (
              <div className="flex gap-4 justify-center mt-6">
                <FileActionButton
                  icon={File}
                  label={UI_STRINGS.ADD_FILES}
                  onClick={handleOpenFiles}
                  variant="cyan"
                />
                <FileActionButton
                  icon={FolderOpen}
                  label={UI_STRINGS.ADD_FOLDER}
                  onClick={handleOpenFolder}
                  variant="magenta"
                />
              </div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              className="relative bg-cyber-dark/80 backdrop-blur-md neon-border-cyan p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CornerDecoration color="neon-cyan" />

              <motion.div
                className="w-full aspect-square mb-6 bg-cyber-darker border border-neon-magenta/30 flex items-center justify-center overflow-hidden relative"
                animate={{ boxShadow: visualizerGlow }}
                transition={{
                  duration: ANIMATION_CONFIG.GLOW_PULSE,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <motion.div
                  className="absolute w-40 h-40 border-2 border-neon-cyan/50 rounded-full"
                  animate={{
                    scale: isPlaying ? [1, 1.5, 1] : 1,
                    opacity: isPlaying ? [0.5, 0, 0.5] : 0.3,
                  }}
                  transition={{ duration: ANIMATION_CONFIG.GLOW_PULSE, repeat: Infinity }}
                />
                <motion.div
                  className="absolute w-32 h-32 border-2 border-neon-magenta/50 rounded-full"
                  animate={{
                    scale: isPlaying ? [1, 1.8, 1] : 1,
                    opacity: isPlaying ? [0.5, 0, 0.5] : 0.3,
                  }}
                  transition={{ duration: ANIMATION_CONFIG.GLOW_PULSE, repeat: Infinity, delay: 0.3 }}
                />

                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-cyan via-neon-magenta to-neon-pink relative"
                  style={{ boxShadow: GLOW_EFFECTS.MAGENTA_STRONG }}
                  animate={{
                    rotate: isPlaying ? 360 : 0,
                  }}
                  transition={{
                    rotate: { duration: ANIMATION_CONFIG.SPIN, repeat: Infinity, ease: 'linear' },
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-cyber-darker border-2 border-neon-cyan" />
                  </div>
                </motion.div>

                {!currentTrack && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Music className="w-16 h-16 text-neon-cyan/30" />
                  </div>
                )}
              </motion.div>

              <div className="text-center mb-6">
                <h2 className="font-cyber text-xl font-bold text-neon-cyan mb-1 tracking-wide truncate">
                  {currentTrack ? currentTrack.title : UI_STRINGS.NO_SIGNAL}
                </h2>
                <p className="text-neon-magenta/60 text-sm tracking-widest uppercase">
                  {currentTrack ? currentTrack.artist : UI_STRINGS.AWAITING_INPUT}
                </p>
              </div>

              <div className="mb-6">
                <ProgressBar
                  currentTime={currentTime}
                  duration={duration}
                  onSeek={handleSeek}
                />
              </div>

              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onShuffle={handleShuffle}
                isShuffled={isShuffled}
                volume={volume}
                onVolumeChange={setVolume}
              />
            </motion.div>

            <motion.div
              className="relative bg-cyber-dark/80 backdrop-blur-md neon-border-magenta p-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <CornerDecoration color="neon-magenta" />

              <h3 className="font-cyber text-lg font-bold mb-4 text-neon-magenta tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-magenta rounded-full animate-pulse" />
                {UI_STRINGS.PLAYLIST}
              </h3>
              <TrackList
                tracks={tracks}
                currentTrackIndex={currentTrackIndex}
                onTrackSelect={handleTrackSelect}
              />
            </motion.div>
          </div>

          {currentTrack && (
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleTrackEnd}
            >
              <source src={getTrackSource(currentTrack)} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
