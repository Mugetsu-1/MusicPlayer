import { motion } from 'framer-motion';
import { motionVariants } from '../utils/motionVariants';

const ControlButton = ({
  icon: Icon,
  onClick,
  active = false,
  activeColor = 'neon-green',
  inactiveColor = 'neon-cyan',
  size = 22,
  label = '',
  glowing = false
}) => {
  const baseClass = active
    ? `bg-${activeColor}/20 text-${activeColor} border-${activeColor} shadow-${activeColor}`
    : `bg-transparent text-${inactiveColor}/50 border-${inactiveColor}/30 hover:border-${inactiveColor} hover:text-${inactiveColor}`;

  return (
    <motion.button
      variants={motionVariants.button}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`p-3 border transition-all duration-300 ${baseClass}`}
      aria-label={label}
    >
      <Icon size={size} />
    </motion.button>
  );
};

export default ControlButton;
