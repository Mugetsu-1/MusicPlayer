import { motion } from 'framer-motion';

const FileActionButton = ({
  icon: Icon,
  label,
  onClick,
  variant = 'cyan'
}) => {
  const colors = {
    cyan: { border: 'neon-border-cyan', text: 'text-neon-cyan', glow: '0 0 20px #00ffff, 0 0 40px #00ffff' },
    magenta: { border: 'neon-border-magenta', text: 'text-neon-magenta', glow: '0 0 20px #ff00ff, 0 0 40px #ff00ff' }
  };

  const color = colors[variant] || colors.cyan;

  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 bg-transparent ${color.border} ${color.text} font-cyber text-sm uppercase tracking-wider hover:bg-${variant === 'cyan' ? 'neon-cyan' : 'neon-magenta'}/10 transition-all duration-300 glitch`}
      whileHover={{ scale: 1.05, boxShadow: color.glow }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </motion.button>
  );
};

export default FileActionButton;
