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
    <div className="min-h-screen bg-slate-950 text-star-white overflow-hidden">
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
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-space-blue via-space-purple to-space-orange bg-clip-text text-transparent">
              Galactic Music Player
            </h1>
            <p className="text-star-white/60">Navigate the cosmos through sound</p>

            {/* Local File Loading Buttons */}
            {isElectron && (
              <div className="flex gap-4 justify-center mt-6">
                <motion.button
                  onClick={handleOpenFiles}
                  className="flex items-center gap-2 px-4 py-2 bg-space-blue/20 border border-space-blue/50 rounded-lg hover:bg-space-blue/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <File className="w-4 h-4" />
                  <span>Add Files</span>
                </motion.button>
                <motion.button
                  onClick={handleOpenFolder}
                  className="flex items-center gap-2 px-4 py-2 bg-space-purple/20 border border-space-purple/50 rounded-lg hover:bg-space-purple/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
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
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Album Art Placeholder */}
              <motion.div
                className="w-full aspect-square mb-6 rounded-xl bg-gradient-to-br from-space-blue/20 to-space-purple/20 border border-space-blue/30 flex items-center justify-center overflow-hidden relative"
                animate={{
                  boxShadow: isPlaying
                    ? [
                        '0 0 20px rgba(0, 217, 255, 0.3)',
                        '0 0 40px rgba(168, 85, 247, 0.3)',
                        '0 0 20px rgba(0, 217, 255, 0.3)',
                      ]
                    : '0 0 0px rgba(0, 217, 255, 0)',
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <motion.div
                  className="w-32 h-32 rounded-full bg-gradient-to-r from-space-blue to-space-purple"
                  animate={{
                    rotate: isPlaying ? 360 : 0,
                    scale: isPlaying ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                    scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                />
              </motion.div>

              {/* Now Playing */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-star-white mb-1">
                  {currentTrack ? currentTrack.title : 'No Track Selected'}
                </h2>
                <p className="text-star-white/60">{currentTrack ? currentTrack.artist : 'Add music to start'}</p>
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
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-xl font-bold mb-4 text-space-blue">Playlist</h3>
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
