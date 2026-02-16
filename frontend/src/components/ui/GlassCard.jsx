import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';
import { DEFAULT_SPRING } from '../../lib/motion';

export function GlassCard({ className, children, hoverLift = true }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={DEFAULT_SPRING}
      whileHover={hoverLift ? { y: -2 } : undefined}
      className={cn('glass-panel rounded-3xl p-5 shadow-glass-inner', className)}
    >
      {children}
    </motion.section>
  );
}

GlassCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  hoverLift: PropTypes.bool
};
