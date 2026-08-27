import './DonutChart.css';

/** data: [{ label, value, color }]. Renders nothing meaningfully if every value is 0. */
export default function DonutChart({ data, size = 140, thickness = 16 }) {
  const total = data.reduce((sum, segment) => sum + segment.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <div className="donut-chart" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Rotate so the first segment starts at 12 o'clock instead of 3 o'clock */}
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {total === 0 ? (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth={thickness}
            />
          ) : (
            data
              .filter((segment) => segment.value > 0)
              .map((segment) => {
                const fraction = segment.value / total;
                const dashLength = fraction * circumference;
                const offset = -cumulative * circumference;
                cumulative += fraction;
                return (
                  <circle
                    key={segment.label}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth={thickness}
                    strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                    strokeDashoffset={offset}
                    strokeLinecap="butt"
                  />
                );
              })
          )}
        </g>
      </svg>
      <div className="donut-chart__center">
        <span className="donut-chart__center-value">{total}</span>
      </div>
    </div>
  );
}
