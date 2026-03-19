import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
      <div
        className="relative h-2 bg-white/10 rounded-full cursor-pointer backdrop-blur-sm border border-white/20 overflow-hidden"
        onClick={handleSeek}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-space-blue via-space-purple to-space-orange rounded-full relative"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        >
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-star-white rounded-full shadow-lg shadow-space-blue/50" />
        </motion.div>
      </div>
      <div className="flex justify-between text-xs text-star-white/70">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
