import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { NeoButton } from '../ui/NeoButton';
import { DEFAULT_SPRING } from '../../lib/motion';

function typeBadgeClass(type) {
  if (type === 'MONTHLY') return 'bg-violet-500/20 text-violet-200';
  if (type === 'WEEKLY') return 'bg-cyan-500/20 text-cyan-200';
  return 'bg-emerald-500/20 text-emerald-200';
}

export function TaskCard({ task, onComplete }) {
  return (
    <GlassCard className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="text-base font-semibold tracking-tight text-text-primary">{task.title}</h4>
          <p className="mt-1 text-sm text-text-secondary">{task.description || 'No description'}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${typeBadgeClass(task.type)}`}>{task.type}</span>
      </div>

      <div className="flex items-center justify-between text-xs text-text-tertiary">
        <span>{new Date(task.startDate).toLocaleDateString()} → {new Date(task.endDate).toLocaleDateString()}</span>
        {task.isProjectedFromMonthly && <span>Projected</span>}
      </div>

      <motion.div layout transition={DEFAULT_SPRING} className="flex justify-end">
        <NeoButton
          disabled={task.status === 'COMPLETED'}
          onClick={() => onComplete(task)}
          className="bg-bg-surface1"
        >
          {task.status === 'COMPLETED' ? 'Completed' : 'Mark Complete'}
        </NeoButton>
      </motion.div>
    </GlassCard>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.oneOf(['DAILY', 'WEEKLY', 'MONTHLY']).isRequired,
    status: PropTypes.oneOf(['PENDING', 'COMPLETED', 'OVERDUE']).isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    isProjectedFromMonthly: PropTypes.bool
  }).isRequired,
  onComplete: PropTypes.func.isRequired
};
