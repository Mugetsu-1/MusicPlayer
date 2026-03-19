import React from 'react';
import { Music, Radio, Disc3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { UI_STRINGS } from '../constants/strings';
import { TRACK_LIST, ANIMATION_CONFIG } from '../constants/config';

const TrackList = ({ tracks, currentTrackIndex, onTrackSelect }) => {
  if (tracks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <Disc3 className="w-16 h-16 text-neon-cyan/20 mb-4" />
        <p className="text-neon-cyan/50 font-cyber text-sm tracking-wider">{UI_STRINGS.NO_TRACKS_LOADED}</p>
        <p className="text-neon-magenta/30 text-xs mt-2">{UI_STRINGS.ADD_FILES_OR_FOLDERS}</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${TRACK_LIST.MAX_HEIGHT} overflow-y-auto space-y-1 pr-2`}>
      {tracks.map((track, index) => (
        <motion.div
          key={track.id || index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * TRACK_LIST.ANIMATION_DELAY_MULTIPLIER }}
          whileHover={{ x: 5 }}
          onClick={() => onTrackSelect(index)}
          className={`relative p-3 cursor-pointer border-l-2 transition-all duration-300 ${
            currentTrackIndex === index
              ? 'bg-neon-cyan/10 border-l-neon-cyan'
              : 'bg-transparent border-l-neon-magenta/20 hover:bg-neon-magenta/5 hover:border-l-neon-magenta/50'
          }`}
        >
          {currentTrackIndex === index && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-transparent"
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: ANIMATION_CONFIG.GLOW_PULSE,
                repeat: Infinity
              }}
            />
          )}

          <div className="flex items-center space-x-3 relative z-10">
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
                  transition={{ duration: ANIMATION_CONFIG.SPIN, repeat: Infinity, ease: 'linear' }}
                >
                  <Radio size={18} className="text-neon-cyan" style={{ filter: 'drop-shadow(0 0 5px #00ffff)' }} />
                </motion.div>
              ) : (
                <span>{String(index + 1).padStart(2, '0')}</span>
              )}
            </div>

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

            <div className="text-xs font-cyber text-neon-cyan/30">
              {track.duration}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-neon-cyan/10 via-neon-magenta/20 to-transparent" />
        </motion.div>
      ))}
    </div>
  );
};

export default TrackList;
