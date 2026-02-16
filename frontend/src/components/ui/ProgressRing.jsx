import PropTypes from 'prop-types';

export function ProgressRing({ size = 92, strokeWidth = 10, value = 0, label = 'Efficiency' }) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255, 255, 255, 0.14)" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#FFFFFF"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 420ms cubic-bezier(0.2, 1, 0.22, 1)' }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-lg font-semibold text-text-primary">{clamped.toFixed(0)}%</p>
        <p className="text-[11px] text-text-tertiary">{label}</p>
      </div>
    </div>
  );
}

ProgressRing.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  value: PropTypes.number,
  label: PropTypes.string
};
