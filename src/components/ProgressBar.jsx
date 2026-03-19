import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    onSeek(percentage * duration);
  };

  return (
    <div className="w-full space-y-2">
      {/* Progress track */}
      <div
        className="relative h-2 bg-cyber-darker border border-neon-cyan/30 cursor-pointer overflow-hidden group"
        onClick={handleSeek}
      >
        {/* Background grid lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-neon-cyan/30"
              style={{ left: `${i * 5}%` }}
            />
          ))}
        </div>

        {/* Progress fill */}
        <motion.div
          className="h-full bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-pink relative"
          style={{
            width: `${progress}%`,
            boxShadow: '0 0 10px #00ffff, 0 0 20px #ff00ff'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        >
          {/* Scan line effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-scan" />
        </motion.div>

        {/* Playhead */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-neon-cyan"
          style={{
            left: `${progress}%`,
            boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff'
          }}
          animate={{
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity
          }}
        />

        {/* Hover indicator */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-neon-cyan/5" />
        </div>
      </div>

      {/* Time display */}
      <div className="flex justify-between text-xs font-cyber tracking-wider">
        <span className="text-neon-cyan">{formatTime(currentTime)}</span>
        <span className="text-neon-magenta/60">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
