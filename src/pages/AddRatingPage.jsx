import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddRatingForm from '../components/AddRatingForm';
import { useRatings } from '../context/useRatings';
import './AddRatingPage.css';

export default function AddRatingPage() {
  const { addRating } = useRatings();
  const navigate = useNavigate();
  const [toast, setToast] = useState('');

  const handleSubmit = async (rating) => {
    await addRating(rating);
    setToast(`Added "${rating.title}"`);
    setTimeout(() => navigate('/ratings'), 700);
  };

  return (
    <div className="page">
      <div className="add-rating-page__panel">
        <AddRatingForm onSubmit={handleSubmit} />
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
