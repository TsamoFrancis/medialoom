import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, Film, BookOpen, Tv, Ghost, Star, FolderClosed } from 'lucide-react';
import StatCard from '../components/StatCard';
import SearchBar from '../components/SearchBar';
import WelcomeBanner from '../components/WelcomeBanner';
import RatingCard from '../components/RatingCard';
import DonutChart from '../components/DonutChart';
import ActivityFeed from '../components/ActivityFeed';
import { useRatings } from '../context/useRatings';
import { calculateAverage, filterByType, sortRatings, buildStarDistributionData } from '../utils/ratings';
import '../components/StatCard.css';
import '../components/RatingsGrid.css';
import './DashboardPage.css';

export default function DashboardPage() {
  const { ratings, status, toggleFavourite } = useRatings();
  const navigate = useNavigate();
  const [topSearch, setTopSearch] = useState('');

  const average = calculateAverage(ratings);
  const recentlyRated = ratings.slice(0, 5);
  const topRated = useMemo(() => sortRatings(ratings, 'rating-desc').slice(0, 5), [ratings]);
  const distributionData = buildStarDistributionData(ratings);

  // Hands off to All Ratings' own search instead of building a second,
  // separate search implementation just for the dashboard.
  const handleTopSearchSubmit = (event) => {
    event.preventDefault();
    if (topSearch.trim()) navigate(`/ratings?q=${encodeURIComponent(topSearch.trim())}`);
  };

  return (
    <div className="page">
      {/* Top bar — reuses SearchBar and the same bell styling every other
          page uses, just arranged as one row to match this page's layout */}
      <form className="dashboard-top-bar" onSubmit={handleTopSearchSubmit}>
        <SearchBar value={topSearch} onChange={setTopSearch} placeholder="Search movies, books, series..." />
        <button type="button" className="page-header__bell" aria-label="Notifications">
          <Bell size={17} />
          <span className="page-header__bell-dot" />
        </button>
      </form>

      <WelcomeBanner ratingCount={ratings.length} />

      {status === 'loading' && <p className="page__status">Loading your ratings…</p>}
      {status === 'error' && (
        <p className="page__status page__status--error">
          Can't reach the server. Make sure the PHP server is running, then refresh this page.
        </p>
      )}

      {status === 'ready' && (
        <>
          {/* Stat cards */}
          <div className="stat-grid">
            <StatCard icon={Film} color="#3b82f6" value={filterByType(ratings, 'movie').length} label="Movies Rated" />
            <StatCard icon={BookOpen} color="#22c55e" value={filterByType(ratings, 'book').length} label="Books Read" />
            <StatCard icon={Tv} color="#a855f7" value={filterByType(ratings, 'tv').length} label="TV Series" />
            <StatCard icon={Ghost} color="#f97316" value={filterByType(ratings, 'anime').length} label="Anime" />
            <StatCard
              icon={Star}
              color="#f4b740"
              value={ratings.length ? `${average.toFixed(1)}/5` : '—'}
              label="Average Rating"
            />
            <StatCard icon={FolderClosed} color="#ec1857" value={ratings.length} label="Total Ratings" />
          </div>

          {ratings.length > 0 && (
            <>
              {/* Recently Rated + Rating Distribution */}
              <section className="dashboard-section">
                <div className="dashboard-section__grid">
                  <div>
                    <div className="dashboard-section__header">
                      <h2>Recently Rated</h2>
                      <Link to="/ratings">View all</Link>
                    </div>
                    <div className="ratings-grid">
                      {recentlyRated.map((rating) => (
                        <RatingCard key={rating.id} rating={rating} onToggleFavourite={toggleFavourite} />
                      ))}
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3>Rating Distribution</h3>
                    <div className="chart-card__body">
                      <DonutChart data={distributionData} />
                      <ul className="chart-card__legend">
                        {distributionData.map((segment) => (
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
              </section>

              {/* Top Rated + Recent Activity */}
              <section className="dashboard-section">
                <div className="dashboard-section__grid">
                  <div>
                    <div className="dashboard-section__header">
                      <h2>Top Rated</h2>
                      <Link to="/ratings">View all</Link>
                    </div>
                    <div className="ratings-grid">
                      {topRated.map((rating) => (
                        <RatingCard key={rating.id} rating={rating} onToggleFavourite={toggleFavourite} />
                      ))}
                    </div>
                  </div>

                  <div className="chart-card">
                    <h3>Recent Activity</h3>
                    <ActivityFeed ratings={ratings.slice(0, 5)} />
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}
