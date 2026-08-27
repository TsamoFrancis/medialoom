import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import StarRating from './StarRating';
import RatingsToolbar from './RatingsToolbar';
import { getMediaType, STATUS_COLORS } from '../constants/mediaTypes';
import { calculateAverage } from '../utils/ratings';
import { formatDate } from '../utils/format';
import './RatingsTable.css';

/**
 * Renders whatever `ratings` it's given, already filtered and sorted by
 * the parent page — a "Movies" page passes only movie entries, sorted
 * however its own filter panel says, and this just displays them.
 */
export default function RatingsTable({ ratings, onDelete }) {
  const navigate = useNavigate();
  const average = calculateAverage(ratings);

  return (
    <section className="ratings-card">
      <RatingsToolbar count={ratings.length} average={average} />

      {ratings.length === 0 ? (
        <div className="ratings-card__empty">
          <p>No ratings yet.</p>
          <span>Click "+ Add New Rating" in the sidebar to add your first one.</span>
        </div>
      ) : (
        <div className="ratings-card__scroll">
          <table className="ratings-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Date</th>
                <th className="ratings-table__action-head">Action</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating, index) => {
                const mediaType = getMediaType(rating.type);
                return (
                  <tr key={rating.id}>
                    <td className="ratings-table__muted">{index + 1}</td>
                    <td>
                      <span className="type-badge" style={{ '--type-color': mediaType.color }}>
                        {mediaType.label}
                      </span>
                    </td>
                    <td className="ratings-table__title">{rating.title}</td>
                    <td className="ratings-table__muted">{rating.genre}</td>
                    <td>
                      <div className="ratings-table__rating">
                        <StarRating value={rating.rating} readOnly size={14} />
                        <span>{rating.rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="status-pill"
                        style={{ '--status-color': STATUS_COLORS[rating.status] || 'var(--text-muted)' }}
                      >
                        <i />
                        {rating.status}
                      </span>
                    </td>
                    <td className="ratings-table__muted">{formatDate(rating.date)}</td>
                    <td>
                      <div className="ratings-table__actions">
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => navigate(`/edit-rating/${rating.id}`)}
                          aria-label={`Edit ${rating.title}`}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          type="button"
                          className="icon-btn icon-btn--danger"
                          onClick={() => onDelete?.(rating.id)}
                          aria-label={`Delete ${rating.title}`}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
