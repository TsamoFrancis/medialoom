import { Film, BookOpen, Tv, Ghost, Star, FolderClosed } from 'lucide-react';
import StatCard from '../components/StatCard';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import { useRatings } from '../context/useRatings';
import { calculateAverage, filterByType, buildStarDistributionData, buildTypeDistributionData } from '../utils/ratings';
import '../components/StatCard.css';
import './StatisticsPage.css';

export default function StatisticsPage() {
  const { ratings, status } = useRatings();
  const average = calculateAverage(ratings);
  const starData = buildStarDistributionData(ratings);
  const typeData = buildTypeDistributionData(ratings);

  return (
    <div className="page">
      <header className="page__header">
        <h1>Statistics</h1>
        <p>Detailed statistics about your ratings.</p>
      </header>

      {status === 'loading' && <p className="page__status">Loading…</p>}
      {status === 'error' && (
        <p className="page__status page__status--error">
          Can't reach the server. Make sure the PHP server is running, then refresh this page.
        </p>
      )}

      {status === 'ready' && (
        <>
          <div className="stat-grid">
            <StatCard icon={FolderClosed} color="#ec1857" value={ratings.length} label="Total Ratings" />
            <StatCard
              icon={Star}
              color="#f4b740"
              value={ratings.length ? `${average.toFixed(1)}/5` : '—'}
              label="Average Rating"
            />
            <StatCard icon={Film} color="#3b82f6" value={filterByType(ratings, 'movie').length} label="Movies" />
            <StatCard icon={BookOpen} color="#22c55e" value={filterByType(ratings, 'book').length} label="Books" />
            <StatCard icon={Tv} color="#a855f7" value={filterByType(ratings, 'tv').length} label="TV Series" />
            <StatCard icon={Ghost} color="#f97316" value={filterByType(ratings, 'anime').length} label="Anime" />
          </div>

          <div className="statistics-grid">
            <div className="chart-card">
              <h3>Rating Distribution</h3>
              <BarChart data={starData} />
            </div>

            <div className="chart-card">
              <h3>Movies vs Others</h3>
              <div className="chart-card__body">
                <DonutChart data={typeData} />
                <ul className="chart-card__legend">
                  {typeData.map((segment) => (
                    <li key={segment.label}>
                      <span className="chart-card__dot" style={{ '--dot-color': segment.color }} />
                      {segment.label}
                      <span className="chart-card__count">
                        {ratings.length ? Math.round((segment.value / ratings.length) * 100) : 0}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
