import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { DEFAULT_SPRING } from '../../lib/motion';

export function NeoButton({ children, className, onClick, type = 'button', pressed = false, disabled = false }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.98 }}
      transition={DEFAULT_SPRING}
      className={cn(
        'rounded-2xl px-4 py-2 text-sm font-medium tracking-tight text-text-primary transition disabled:cursor-not-allowed disabled:opacity-60',
        pressed ? 'shadow-neo-pressed' : 'shadow-neo',
        className
      )}
    >
      {children}
    </motion.button>
  );
}

NeoButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  pressed: PropTypes.bool,
  disabled: PropTypes.bool
};
