import React from 'react';
import { Music, Radio, Disc3 } from 'lucide-react';
import { motion } from 'framer-motion';

const TrackList = ({ tracks, currentTrackIndex, onTrackSelect }) => {
  if (tracks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <Disc3 className="w-16 h-16 text-neon-cyan/20 mb-4" />
        <p className="text-neon-cyan/50 font-cyber text-sm tracking-wider">NO TRACKS LOADED</p>
        <p className="text-neon-magenta/30 text-xs mt-2">Add files or folders to begin</p>
      </div>
    );
  }

  return (
    <div className="w-full max-h-80 overflow-y-auto space-y-1 pr-2">
      {tracks.map((track, index) => (
        <motion.div
          key={track.id || index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.03 }}
          whileHover={{ x: 5 }}
          onClick={() => onTrackSelect(index)}
          className={`relative p-3 cursor-pointer border-l-2 transition-all duration-300 ${
            currentTrackIndex === index
              ? 'bg-neon-cyan/10 border-l-neon-cyan'
              : 'bg-transparent border-l-neon-magenta/20 hover:bg-neon-magenta/5 hover:border-l-neon-magenta/50'
          }`}
        >
          {/* Active indicator glow */}
          {currentTrackIndex === index && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-transparent"
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          )}

          <div className="flex items-center space-x-3 relative z-10">
            {/* Track number / Icon */}
            <div
              className={`w-8 h-8 flex items-center justify-center text-xs font-cyber ${
                currentTrackIndex === index
                  ? 'text-neon-cyan'
                  : 'text-neon-magenta/40'
              }`}
            >
              {currentTrackIndex === index ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Radio size={18} className="text-neon-cyan" style={{ filter: 'drop-shadow(0 0 5px #00ffff)' }} />
                </motion.div>
              ) : (
                <span>{String(index + 1).padStart(2, '0')}</span>
              )}
            </div>

            {/* Track info */}
            <div className="flex-1 min-w-0">
              <h3
                className={`text-sm font-medium truncate tracking-wide ${
                  currentTrackIndex === index
                    ? 'text-neon-cyan'
                    : 'text-star-white/80'
                }`}
                style={currentTrackIndex === index ? { textShadow: '0 0 10px #00ffff' } : {}}
              >
                {track.title}
              </h3>
              <p className="text-xs text-neon-magenta/40 truncate">{track.artist}</p>
            </div>

            {/* Duration */}
            <div className="text-xs font-cyber text-neon-cyan/30">
              {track.duration}
            </div>
          </div>

          {/* Bottom border with gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-neon-cyan/10 via-neon-magenta/20 to-transparent" />
        </motion.div>
      ))}
    </div>
  );
};

export default TrackList;
