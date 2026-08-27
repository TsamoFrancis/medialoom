import './BarChart.css';

/** data: [{ label, value, color }]. Bars scale relative to the largest value. */
export default function BarChart({ data }) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="bar-chart">
      {data.map((item) => (
        <div key={item.label} className="bar-chart__row">
          <span className="bar-chart__label">{item.label}</span>
          <div className="bar-chart__track">
            <div
              className="bar-chart__fill"
              style={{ width: `${(item.value / max) * 100}%`, '--bar-color': item.color }}
            />
          </div>
          <span className="bar-chart__value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
