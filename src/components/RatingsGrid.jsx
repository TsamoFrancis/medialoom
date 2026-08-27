import RatingsToolbar from './RatingsToolbar';
import RatingCard from './RatingCard';
import { calculateAverage } from '../utils/ratings';
import './RatingsGrid.css';

// Sorting/filtering happens in the parent page, so this just renders
// whatever order it's handed. onToggleFavourite is optional and passed
// straight through to each card.
export default function RatingsGrid({
  ratings,
  onToggleFavourite,
  emptyTitle = 'Nothing here yet.',
  emptyHint,
}) {
  const average = calculateAverage(ratings);

  return (
    <section>
      <RatingsToolbar count={ratings.length} average={average} />

      {ratings.length === 0 ? (
        <div className="ratings-grid__empty">
          <p>{emptyTitle}</p>
          {emptyHint && <span>{emptyHint}</span>}
        </div>
      ) : (
        <div className="ratings-grid">
          {ratings.map((rating) => (
            <RatingCard key={rating.id} rating={rating} onToggleFavourite={onToggleFavourite} />
          ))}
        </div>
      )}
    </section>
  );
}
