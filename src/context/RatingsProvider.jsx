import { useEffect, useState } from 'react';
import { fetchRatings, createRating, deleteRating, updateRating as patchRating } from '../api/ratings';
import { RatingsContext } from './ratingsContext';

export function RatingsProvider({ children }) {
  const [ratings, setRatings] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

  useEffect(() => {
    fetchRatings()
      .then((data) => {
        setRatings(data);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  const addRating = async (rating) => {
    const saved = await createRating(rating);
    setRatings((prev) => [saved, ...prev]);
    return saved;
  };

  const removeRating = async (id) => {
    await deleteRating(id);
    setRatings((prev) => prev.filter((entry) => entry.id !== id));
  };

  const updateRating = async (id, updates) => {
    const updated = await patchRating(id, updates);
    setRatings((prev) => prev.map((entry) => (entry.id === id ? updated : entry)));
    return updated;
  };

  const toggleFavourite = (id, favourite) => updateRating(id, { favourite });

  return (
    <RatingsContext.Provider value={{ ratings, status, addRating, removeRating, updateRating, toggleFavourite }}>
      {children}
    </RatingsContext.Provider>
  );
}
