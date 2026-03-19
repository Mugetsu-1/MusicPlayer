import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PlayerControls = ({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onShuffle,
  isShuffled,
  volume,
  onVolumeChange
}) => {
  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: '0 0 20px rgba(0, 217, 255, 0.6)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-6">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onShuffle}
          className={`p-3 rounded-full backdrop-blur-md transition-all ${
            isShuffled
              ? 'bg-space-blue/30 text-space-blue border border-space-blue'
              : 'bg-white/10 text-star-white border border-white/20'
          }`}
          aria-label="Shuffle"
        >
          <Shuffle size={20} />
        </motion.button>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onPrevious}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-star-white"
          aria-label="Previous"
        >
          <SkipBack size={24} />
        </motion.button>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onPlayPause}
          className="p-5 rounded-full bg-gradient-to-r from-space-blue to-space-purple backdrop-blur-md border-2 border-space-blue shadow-lg shadow-space-blue/50"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" />}
        </motion.button>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onNext}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-star-white"
          aria-label="Next"
        >
          <SkipForward size={24} />
        </motion.button>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-star-white"
          aria-label="Volume"
        >
          <Volume2 size={20} />
        </motion.button>
      </div>

      <div className="flex items-center space-x-3 w-48">
        <Volume2 size={16} className="text-star-white" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => onVolumeChange(e.target.value)}
          className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-space-blue"
          style={{
            background: `linear-gradient(to right, #00d9ff ${volume}%, rgba(255,255,255,0.2) ${volume}%)`
          }}
        />
      </div>
    </div>
  );
};

export default PlayerControls;
