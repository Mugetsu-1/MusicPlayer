import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { formatTime } from '../utils/timeUtils';
import { PROGRESS_BAR } from '../constants/config';
import { GLOW_EFFECTS } from '../constants/effects';

const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const progress = useMemo(() => (duration > 0 ? (currentTime / duration) * 100 : 0), [currentTime, duration]);

  const gridLines = useMemo(() => {
    return Array.from({ length: PROGRESS_BAR.GRID_LINES }, (_, i) => i);
  }, []);

  const handleSeek = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    onSeek(percentage * duration);
  }, [duration, onSeek]);

  return (
    <div className="w-full space-y-2">
      <div
        className="relative h-2 bg-cyber-darker border border-neon-cyan/30 cursor-pointer overflow-hidden group"
        onClick={handleSeek}
      >
        <div className="absolute inset-0 opacity-20">
          {gridLines.map((i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-neon-cyan/30"
              style={{ left: `${i * PROGRESS_BAR.GRID_LINE_SPACING}%` }}
            />
          ))}
        </div>

        <motion.div
          className="h-full bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-pink relative"
          style={{
            width: `${progress}%`,
            boxShadow: GLOW_EFFECTS.MIXED
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-scan" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-neon-cyan"
          style={{
            left: `${progress}%`,
            boxShadow: GLOW_EFFECTS.CYAN_LIGHT
          }}
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-neon-cyan/5" />
        </div>
      </div>

      <div className="flex justify-between text-xs font-cyber tracking-wider">
        <span className="text-neon-cyan">{formatTime(currentTime)}</span>
        <span className="text-neon-magenta/60">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
