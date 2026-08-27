export default function StatCard({ icon: Icon, color, value, label }) {
  return (
    <div className="stat-card">
      <span className="stat-card__icon" style={{ '--stat-color': color }}>
        <Icon size={18} />
      </span>
      <div>
        <p className="stat-card__value">{value}</p>
        <p className="stat-card__label">{label}</p>
      </div>
    </div>
  );
}
