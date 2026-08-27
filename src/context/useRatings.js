import { useContext } from 'react';
import { RatingsContext } from './ratingsContext';

export function useRatings() {
  const context = useContext(RatingsContext);
  if (!context) {
    throw new Error('useRatings must be called from inside <RatingsProvider>.');
  }
  return context;
}
