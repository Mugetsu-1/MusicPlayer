import React from 'react';
import { Music, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

const TrackList = ({ tracks, currentTrackIndex, onTrackSelect }) => {
  return (
    <div className="w-full max-h-96 overflow-y-auto space-y-2 pr-2">
      {tracks.map((track, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02, x: 5 }}
          onClick={() => onTrackSelect(index)}
          className={`p-4 rounded-lg cursor-pointer backdrop-blur-md border transition-all ${
            currentTrackIndex === index
              ? 'bg-space-blue/20 border-space-blue shadow-lg shadow-space-blue/30'
              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div
              className={`p-2 rounded-full ${
                currentTrackIndex === index
                  ? 'bg-space-blue text-slate-950'
                  : 'bg-white/10 text-star-white'
              }`}
            >
              {currentTrackIndex === index ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Radio size={20} />
                </motion.div>
              ) : (
                <Music size={20} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`text-sm font-semibold truncate ${
                  currentTrackIndex === index ? 'text-space-blue' : 'text-star-white'
                }`}
              >
                {track.title}
              </h3>
              <p className="text-xs text-star-white/60 truncate">{track.artist}</p>
            </div>
            <div className="text-xs text-star-white/50">{track.duration}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TrackList;
