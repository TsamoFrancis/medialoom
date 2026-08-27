import { Heart } from 'lucide-react';
import StarRating from './StarRating';
import { getMediaType } from '../constants/mediaTypes';
import './RatingCard.css';

// onToggleFavourite is optional — pages that don't need it (or haven't
// wired it through yet) just get a card with no favourite button.
export default function RatingCard({ rating, onToggleFavourite }) {
  const mediaType = getMediaType(rating.type);
  const Icon = mediaType.icon;
  const isFavourite = Boolean(rating.favourite);

  return (
    <article className="rating-card">
      <div className="rating-card__cover" style={{ '--type-color': mediaType.color }}>
        <Icon size={30} />
        {onToggleFavourite && (
          <button
            type="button"
            className={`rating-card__favourite${isFavourite ? ' is-active' : ''}`}
            onClick={() => onToggleFavourite(rating.id, !isFavourite)}
            aria-pressed={isFavourite}
            aria-label={isFavourite ? `Remove ${rating.title} from favourites` : `Add ${rating.title} to favourites`}
          >
            <Heart size={15} fill={isFavourite ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <div className="rating-card__body">
        <p className="rating-card__title">{rating.title}</p>
        <p className="rating-card__genre">{rating.genre}</p>
        <div className="rating-card__rating">
          <StarRating value={rating.rating} readOnly size={13} />
          <span>{rating.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}
