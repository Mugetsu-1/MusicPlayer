import React, { useMemo } from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { motionVariants } from '../utils/motionVariants';
import { UI_STRINGS } from '../constants/strings';
import { PLAYER_CONFIG } from '../constants/config';
import { GLOW_EFFECTS } from '../constants/effects';

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
  const playButtonGlow = useMemo(() => {
    return isPlaying ? GLOW_EFFECTS.CYAN_STRONG : GLOW_EFFECTS.MIXED;
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex items-center space-x-4">
        <motion.button
          variants={motionVariants.button}
          whileHover="hover"
          whileTap="tap"
          onClick={onShuffle}
          className={`p-3 border transition-all duration-300 ${
            isShuffled
              ? 'bg-neon-green/20 text-neon-green border-neon-green shadow-neon-green'
              : 'bg-transparent text-neon-cyan/50 border-neon-cyan/30 hover:border-neon-cyan hover:text-neon-cyan'
          }`}
          aria-label="Shuffle"
        >
          <Shuffle size={18} />
        </motion.button>

        <motion.button
          variants={motionVariants.button}
          whileHover="hover"
          whileTap="tap"
          onClick={onPrevious}
          className="p-3 bg-transparent border border-neon-cyan/30 text-neon-cyan hover:border-neon-cyan hover:shadow-neon-cyan transition-all duration-300"
          aria-label="Previous"
        >
          <SkipBack size={22} />
        </motion.button>

        <motion.button
          variants={motionVariants.button}
          whileHover="hover"
          whileTap="tap"
          onClick={onPlayPause}
          className="relative p-5 bg-gradient-to-br from-neon-cyan via-neon-magenta to-neon-pink text-cyber-darker"
          style={{ boxShadow: playButtonGlow }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause size={28} fill="currentColor" />
          ) : (
            <Play size={28} fill="currentColor" className="ml-1" />
          )}
        </motion.button>

        <motion.button
          variants={motionVariants.button}
          whileHover="hover"
          whileTap="tap"
          onClick={onNext}
          className="p-3 bg-transparent border border-neon-cyan/30 text-neon-cyan hover:border-neon-cyan hover:shadow-neon-cyan transition-all duration-300"
          aria-label="Next"
        >
          <SkipForward size={22} />
        </motion.button>

        <motion.div className="p-3 text-neon-magenta/50">
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </motion.div>
      </div>

      <div className="flex items-center space-x-3 w-full max-w-[200px]">
        <span className="text-neon-cyan/50 text-xs font-cyber">{UI_STRINGS.VOLUME_LABEL}</span>
        <div className="relative flex-1 h-1 bg-cyber-darker border border-neon-cyan/20">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-cyan to-neon-magenta"
            style={{ width: `${volume}%` }}
            animate={{
              boxShadow: volume > 0 ? '0 0 10px #00ffff' : 'none'
            }}
          />
          <input
            type="range"
            min={PLAYER_CONFIG.VOLUME_MIN}
            max={PLAYER_CONFIG.VOLUME_MAX}
            value={volume}
            onChange={(e) => onVolumeChange(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
        </div>
        <span className="text-neon-magenta text-xs font-cyber w-8">{volume}%</span>
      </div>
    </div>
  );
};

export default PlayerControls;
