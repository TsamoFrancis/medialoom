import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddRatingForm from '../components/AddRatingForm';
import { useRatings } from '../context/useRatings';
import './AddRatingPage.css';

export default function EditRatingPage() {
  const { id } = useParams();
  const { ratings, status, updateRating } = useRatings();
  const navigate = useNavigate();
  const [toast, setToast] = useState('');

  const rating = ratings.find((entry) => entry.id === id);

  const handleSubmit = async (updates) => {
    await updateRating(id, updates);
    setToast(`Saved changes to "${updates.title}"`);
    setTimeout(() => navigate('/ratings'), 700);
  };

  if (status === 'loading') {
    return (
      <div className="page">
        <p className="page__status">Loading…</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="page">
        <p className="page__status page__status--error">
          Can't reach the server. Make sure the PHP server is running, then refresh this page.
        </p>
      </div>
    );
  }

  if (!rating) {
    return (
      <div className="page">
        <p className="page__status page__status--error">
          Couldn't find that rating — it may already have been deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="add-rating-page__panel">
        <AddRatingForm onSubmit={handleSubmit} initialRating={rating} />
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
