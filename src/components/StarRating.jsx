import { Star } from 'lucide-react';
import './StarRating.css';

/**
 * Controlled 1–5 star control. Pass `readOnly` to reuse this for display
 * (e.g. in the All Ratings table) instead of input.
 */
export default function StarRating({ value = 0, onChange, readOnly = false, size = 22 }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating" role="group" aria-label="Rating, 1 to 5 stars">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          className={`star-rating__star${star <= value ? ' is-filled' : ''}`}
          onClick={readOnly ? undefined : () => onChange?.(star)}
          disabled={readOnly}
          aria-label={`Rate ${star} out of 5`}
          aria-pressed={star === value}
        >
          <Star size={size} strokeWidth={1.75} fill={star <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  );
}
