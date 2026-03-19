import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, File, Music } from 'lucide-react';
import StarfieldBackground from './components/StarfieldBackground';
import PlayerControls from './components/PlayerControls';
import ProgressBar from './components/ProgressBar';
import TrackList from './components/TrackList';
import './index.css';

const STORAGE_KEY = 'galactic-music-player-tracks';

// Load tracks from localStorage
const loadTracksFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save tracks to localStorage
const saveTracksToStorage = (tracks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
  } catch (e) {
    console.error('Failed to save tracks:', e);
  }
};

function App() {
  const [tracks, setTracks] = useState(loadTracksFromStorage);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isShuffled, setIsShuffled] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = tracks[currentTrackIndex] || null;

  // Save tracks to localStorage whenever they change
  useEffect(() => {
    saveTracksToStorage(tracks);
  }, [tracks]);

  // Update audio element when track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle metadata loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle track end
  const handleTrackEnd = () => {
    handleNext();
  };

  // Play/Pause toggle
  const handlePlayPause = () => {
    if (!currentTrack || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Next track
  const handleNext = () => {
    if (tracks.length === 0) return;
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    }
    setIsPlaying(true);
  };

  // Previous track
  const handlePrevious = () => {
    if (tracks.length === 0) return;
    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    }
    setIsPlaying(true);
  };

  // Shuffle toggle
  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  // Seek
  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Track selection
  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  // Check if running in Electron
  const isElectron = typeof window !== 'undefined' && window.electronAPI;

  // Handle file selection
  const handleOpenFiles = async () => {
    if (isElectron) {
      const newTracks = await window.electronAPI.openFiles();
      if (newTracks.length > 0) {
        setTracks([...tracks, ...newTracks]);
      }
    }
  };

  // Handle folder selection
  const handleOpenFolder = async () => {
    if (isElectron) {
      const newTracks = await window.electronAPI.openFolder();
      if (newTracks.length > 0) {
        setTracks([...tracks, ...newTracks]);
      }
    }
  };

  // Get the source URL for a track (convert local paths to local-audio:// URLs)
  const getTrackSource = (track) => {
    if (track.isLocal) {
      // Use custom protocol for local files
      return `local-audio://${encodeURIComponent(track.url)}`;
    }
    return track.url;
  };

  return (
    <div className="min-h-screen bg-cyber-darker text-star-white overflow-hidden cyber-grid relative">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none scanlines z-50" />

      <StarfieldBackground />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-cyber text-4xl md:text-5xl font-bold mb-2 text-neon-cyan text-glow-cyan tracking-wider">
              NEON PLAYER
            </h1>
            <p className="text-neon-magenta/80 font-medium tracking-widest uppercase text-sm">
              // AUDIO SYSTEM v2.0
            </p>

            {/* Local File Loading Buttons */}
            {isElectron && (
              <div className="flex gap-4 justify-center mt-6">
                <motion.button
                  onClick={handleOpenFiles}
                  className="flex items-center gap-2 px-6 py-3 bg-transparent neon-border-cyan text-neon-cyan font-cyber text-sm uppercase tracking-wider hover:bg-neon-cyan/10 transition-all duration-300 glitch"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px #00ffff, 0 0 40px #00ffff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <File className="w-4 h-4" />
                  <span>Add Files</span>
                </motion.button>
                <motion.button
                  onClick={handleOpenFolder}
                  className="flex items-center gap-2 px-6 py-3 bg-transparent neon-border-magenta text-neon-magenta font-cyber text-sm uppercase tracking-wider hover:bg-neon-magenta/10 transition-all duration-300 glitch"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px #ff00ff, 0 0 40px #ff00ff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>Add Folder</span>
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Main Player Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Player Console */}
            <motion.div
              className="relative bg-cyber-dark/80 backdrop-blur-md neon-border-cyan p-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan" />

              {/* Visualizer / Album Art */}
              <motion.div
                className="w-full aspect-square mb-6 bg-cyber-darker border border-neon-magenta/30 flex items-center justify-center overflow-hidden relative"
                animate={{
                  boxShadow: isPlaying
                    ? [
                        '0 0 20px rgba(255, 0, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1)',
                        '0 0 40px rgba(0, 255, 255, 0.3), inset 0 0 50px rgba(255, 0, 255, 0.1)',
                        '0 0 20px rgba(255, 0, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1)',
                      ]
                    : '0 0 10px rgba(255, 0, 255, 0.1)',
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Animated rings */}
                <motion.div
                  className="absolute w-40 h-40 border-2 border-neon-cyan/50 rounded-full"
                  animate={{
                    scale: isPlaying ? [1, 1.5, 1] : 1,
                    opacity: isPlaying ? [0.5, 0, 0.5] : 0.3,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute w-32 h-32 border-2 border-neon-magenta/50 rounded-full"
                  animate={{
                    scale: isPlaying ? [1, 1.8, 1] : 1,
                    opacity: isPlaying ? [0.5, 0, 0.5] : 0.3,
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                />

                {/* Center disc */}
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-cyan via-neon-magenta to-neon-pink relative"
                  style={{ boxShadow: '0 0 30px #ff00ff, 0 0 60px #00ffff' }}
                  animate={{
                    rotate: isPlaying ? 360 : 0,
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-cyber-darker border-2 border-neon-cyan" />
                  </div>
                </motion.div>

                {/* Music icon when no track */}
                {!currentTrack && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Music className="w-16 h-16 text-neon-cyan/30" />
                  </div>
                )}
              </motion.div>

              {/* Now Playing */}
              <div className="text-center mb-6">
                <h2 className="font-cyber text-xl font-bold text-neon-cyan mb-1 tracking-wide truncate">
                  {currentTrack ? currentTrack.title : '[ NO SIGNAL ]'}
                </h2>
                <p className="text-neon-magenta/60 text-sm tracking-widest uppercase">
                  {currentTrack ? currentTrack.artist : 'AWAITING INPUT'}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <ProgressBar
                  currentTime={currentTime}
                  duration={duration}
                  onSeek={handleSeek}
                />
              </div>

              {/* Player Controls */}
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

            {/* Right Side - Track List */}
            <motion.div
              className="relative bg-cyber-dark/80 backdrop-blur-md neon-border-magenta p-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-magenta" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-magenta" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-magenta" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-magenta" />

              <h3 className="font-cyber text-lg font-bold mb-4 text-neon-magenta tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-magenta rounded-full animate-pulse" />
                PLAYLIST
              </h3>
              <TrackList
                tracks={tracks}
                currentTrackIndex={currentTrackIndex}
                onTrackSelect={handleTrackSelect}
              />
            </motion.div>
          </div>

          {/* Audio Element */}
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
