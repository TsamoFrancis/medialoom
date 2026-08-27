import StarRating from './StarRating';
import { formatRelativeTime } from '../utils/format';
import './ActivityFeed.css';

export default function ActivityFeed({ ratings }) {
  if (ratings.length === 0) {
    return (
      <div className="activity-feed activity-feed--empty">
        <p>Nothing yet — your activity will show up here.</p>
      </div>
    );
  }

  return (
    <ul className="activity-feed">
      {ratings.map((rating) => (
        <li key={rating.id} className="activity-feed__item">
          <div className="activity-feed__text">
            <p>
              You rated <strong>{rating.title}</strong>
            </p>
            <StarRating value={rating.rating} readOnly size={12} />
          </div>
          <span className="activity-feed__time">{formatRelativeTime(rating.createdAt)}</span>
        </li>
      ))}
    </ul>
  );
}
