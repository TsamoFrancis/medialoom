import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import StarRating from './StarRating';
import { MEDIA_TYPES, GENRES_BY_TYPE, STATUS_BY_TYPE, REVIEW_MAX_LENGTH } from '../constants/mediaTypes';
import './AddRatingForm.css';

const today = () => new Date().toISOString().slice(0, 10);

const getInitialForm = (initialRating) => (initialRating
  ? {
      type: initialRating.type,
      title: initialRating.title,
      genre: initialRating.genre,
      rating: initialRating.rating,
      status: initialRating.status,
      date: initialRating.date,
      review: initialRating.review || '',
    }
  : {
      type: 'movie',
      title: '',
      genre: '',
      rating: 0,
      status: STATUS_BY_TYPE.movie[0],
      date: today(),
      review: '',
    });

export default function AddRatingForm({ onSubmit, initialRating = null }) {
  const isEditing = Boolean(initialRating);
  const [form, setForm] = useState(() => getInitialForm(initialRating));
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genreOptions = GENRES_BY_TYPE[form.type];
  const statusOptions = STATUS_BY_TYPE[form.type];

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Switching type resets genre (its options depend on type) and defaults
  // status to that type's first option, so "Watched" doesn't linger on a Book.
  const handleTypeChange = (typeId) => {
    setForm((prev) => ({
      ...prev,
      type: typeId,
      genre: '',
      status: STATUS_BY_TYPE[typeId][0],
    }));
    setErrors((prev) => ({ ...prev, genre: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Enter a title.';
    if (!form.genre) nextErrors.genre = 'Pick a genre.';
    if (!form.rating) nextErrors.rating = 'Pick a rating from 1 to 5.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleReset = () => {
    setForm(getInitialForm(initialRating));
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      // No id/createdAt here anymore — the server assigns those now that
      // there is one, so two people (or two tabs) can never collide.
      await onSubmit?.({ ...form, title: form.title.trim() });
      handleReset();
    } catch (error) {
      setSubmitError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="rating-form" onSubmit={handleSubmit} noValidate>
      <header className="rating-form__header">
        <h2>{isEditing ? 'Edit Rating' : 'Add New Rating'}</h2>
        <p>{isEditing ? 'Update the details for this entry.' : 'Add a movie, book, TV series or anime and rate it.'}</p>
      </header>

      <div className="rating-form__field">
        <span className="rating-form__label">Type</span>
        <div className="type-group" role="group" aria-label="Media type">
          {MEDIA_TYPES.map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              type="button"
              className={`type-pill${form.type === id ? ' is-active' : ''}`}
              style={{ '--type-color': color }}
              onClick={() => handleTypeChange(id)}
              aria-pressed={form.type === id}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rating-form__field">
        <label htmlFor="rf-title" className="rating-form__label">Title</label>
        <input
          id="rf-title"
          type="text"
          placeholder="Enter Title"
          value={form.title}
          onChange={(event) => updateField('title', event.target.value)}
          className={errors.title ? 'has-error' : ''}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'rf-title-error' : undefined}
        />
        {errors.title && <span id="rf-title-error" className="field-error">{errors.title}</span>}
      </div>

      <div className="rating-form__field">
        <label htmlFor="rf-genre" className="rating-form__label">Genre / Category</label>
        <div className="select-shell">
          <select
            id="rf-genre"
            value={form.genre}
            onChange={(event) => updateField('genre', event.target.value)}
            className={errors.genre ? 'has-error' : ''}
            aria-invalid={Boolean(errors.genre)}
            aria-describedby={errors.genre ? 'rf-genre-error' : undefined}
          >
            <option value="" disabled>Select genre</option>
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
          <ChevronDown size={16} className="select-shell__icon" />
        </div>
        {errors.genre && <span id="rf-genre-error" className="field-error">{errors.genre}</span>}
      </div>

      <div className="rating-form__row">
        <div className="rating-form__field">
          <span className="rating-form__label">Rating (1 - 5)</span>
          <StarRating value={form.rating} onChange={(value) => updateField('rating', value)} />
          {errors.rating && <span className="field-error">{errors.rating}</span>}
        </div>

        <div className="rating-form__field">
          <label htmlFor="rf-status" className="rating-form__label">Status</label>
          <div className="select-shell">
            <select
              id="rf-status"
              value={form.status}
              onChange={(event) => updateField('status', event.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <ChevronDown size={16} className="select-shell__icon" />
          </div>
        </div>
      </div>

      <div className="rating-form__field">
        <label htmlFor="rf-date" className="rating-form__label">Date</label>
        <div className="date-shell">
          <input
            id="rf-date"
            type="date"
            value={form.date}
            onChange={(event) => updateField('date', event.target.value)}
          />
          <Calendar size={16} className="date-shell__icon" />
        </div>
      </div>

      <div className="rating-form__field">
        <label htmlFor="rf-review" className="rating-form__label">Your Review (Optional)</label>
        <textarea
          id="rf-review"
          placeholder="Write your review..."
          value={form.review}
          maxLength={REVIEW_MAX_LENGTH}
          onChange={(event) => updateField('review', event.target.value)}
          rows={4}
        />
        <span className="char-count">{form.review.length}/{REVIEW_MAX_LENGTH}</span>
      </div>

      <footer className="rating-form__footer">
        {submitError && <p className="form-error">{submitError}</p>}
        <div className="rating-form__footer-buttons">
          <button type="button" className="btn btn--ghost" onClick={handleReset} disabled={isSubmitting}>
            Reset
          </button>
          <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
            {isSubmitting ? (isEditing ? 'Saving…' : 'Adding…') : (isEditing ? 'Save Changes' : 'Add Rating')}
          </button>
        </div>
      </footer>
    </form>
  );
}
