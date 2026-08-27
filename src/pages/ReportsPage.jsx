import { useRatings } from '../context/useRatings';
import { calculateAverage } from '../utils/ratings';
import './FeaturePages.css';

function toCsv(ratings) {
  const header = ['Title', 'Type', 'Genre', 'Rating', 'Status', 'Date', 'Review'];
  const rows = ratings.map((r) => [r.title, r.type, r.genre, r.rating, r.status, r.date, r.review]);
  const escape = (value) => `"${String(value).replace(/"/g, '""')}"`;
  return [header, ...rows].map((row) => row.map(escape).join(',')).join('\n');
}

export default function ReportsPage() {
  const { ratings, status } = useRatings();
  const average = calculateAverage(ratings);

  const handleDownload = () => {
    const csv = toCsv(ratings);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `medialoom-ratings-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page">
      <header className="page__header">
        <h1>Reports</h1>
        <p>Export your ratings as a spreadsheet-ready CSV file.</p>
      </header>

      {status === 'loading' && <p className="page__status">Loading…</p>}
      {status === 'error' && (
        <p className="page__status page__status--error">
          Can't reach the server. Make sure the PHP server is running, then refresh this page.
        </p>
      )}

      {status === 'ready' && (
        <div className="report-panel">
          <div className="report-panel__stats">
            <div>
              <span>Total ratings</span>
              <strong>{ratings.length}</strong>
            </div>
            <div>
              <span>Average rating</span>
              <strong>{ratings.length ? `${average.toFixed(1)}/5` : '—'}</strong>
            </div>
          </div>

          <div className="report-panel__preview">
            {ratings.length === 0 ? (
              <p className="page__status">Nothing to export yet — add a rating first.</p>
            ) : (
              <table className="report-panel__table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.slice(0, 8).map((rating) => (
                    <tr key={rating.id}>
                      <td>{rating.title}</td>
                      <td>{rating.type}</td>
                      <td>{rating.rating}/5</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {ratings.length > 8 && (
              <p className="report-panel__more">+ {ratings.length - 8} more in the full export</p>
            )}
          </div>

          <button type="button" className="btn btn--primary" onClick={handleDownload} disabled={ratings.length === 0}>
            Download CSV
          </button>
        </div>
      )}
    </div>
  );
}
