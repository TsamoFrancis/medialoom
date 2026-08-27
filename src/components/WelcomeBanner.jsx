import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './WelcomeBanner.css';

export default function WelcomeBanner({ ratingCount = 0 }) {
  const navigate = useNavigate();

  return (
    <div className="welcome-banner">
      <h2>Welcome back</h2>
      <p>Track, rate and review your favourite movies, books, TV series and anime.</p>
      <div className="welcome-banner__actions">
        <button type="button" className="btn btn--primary" onClick={() => navigate('/add-rating')}>
          Add New Rating
          <ArrowRight size={15} />
        </button>
        <span className="welcome-banner__count">
          {ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'} in your library
        </span>
      </div>
    </div>
  );
}
