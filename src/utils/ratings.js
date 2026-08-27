import { MEDIA_TYPES } from '../constants/mediaTypes';

export const SORT_OPTIONS = [
  { id: 'rating-desc', label: 'Highest Rating' },
  { id: 'rating-asc', label: 'Lowest Rating' },
  { id: 'date-desc', label: 'Newest First' },
  { id: 'date-asc', label: 'Oldest First' },
];

/**
 * Returns a new sorted array — never mutates the input, since `ratings`
 * is React state and Array.prototype.sort mutates in place.
 */
export function sortRatings(ratings, sortId) {
  const sorted = [...ratings];
  switch (sortId) {
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'rating-asc':
      return sorted.sort((a, b) => a.rating - b.rating);
    case 'date-desc':
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    case 'date-asc':
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    default:
      return sorted;
  }
}

/**
 * Average across whatever list is passed in. Returns 0 for an empty list —
 * callers are responsible for rendering that as "—" rather than "0.0",
 * since 0.0 reads as a real (terrible) average rather than "no data yet".
 */
export function calculateAverage(ratings) {
  if (ratings.length === 0) return 0;
  const total = ratings.reduce((sum, entry) => sum + entry.rating, 0);
  return total / ratings.length;
}

export function filterByType(ratings, typeId) {
  if (!typeId || typeId === 'all') return ratings;
  return ratings.filter((entry) => entry.type === typeId);
}

/** Same idea as filterByType, but for a set of types at once — Watchlist
 * spans movie/tv/anime, for example, not just one. */
export function filterByTypes(ratings, typeIds) {
  if (!typeIds || typeIds.length === 0) return ratings;
  return ratings.filter((entry) => typeIds.includes(entry.type));
}

export function filterByFavourite(ratings) {
  return ratings.filter((entry) => Boolean(entry.favourite));
}

export function filterByTitle(ratings, query) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return ratings;
  return ratings.filter((entry) => entry.title.toLowerCase().includes(trimmed));
}

/** Counts entries at each star value 1–5, for the dashboard donut chart. */
export function getRatingDistribution(ratings) {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  ratings.forEach((entry) => {
    const rounded = Math.round(entry.rating);
    if (counts[rounded] !== undefined) counts[rounded] += 1;
  });
  return counts;
}

const STAR_COLORS = { 5: '#22c55e', 4: '#84cc16', 3: '#eab308', 2: '#f97316', 1: '#ef4444' };

/** {label, value, color} per star, ready for DonutChart or BarChart. */
export function buildStarDistributionData(ratings) {
  const distribution = getRatingDistribution(ratings);
  return [5, 4, 3, 2, 1].map((star) => ({
    label: `${star} Star${star === 1 ? '' : 's'}`,
    value: distribution[star],
    color: STAR_COLORS[star],
  }));
}

/** {label, value, color} per media type, ready for DonutChart. */
export function buildTypeDistributionData(ratings) {
  return MEDIA_TYPES.map((type) => ({
    label: type.label,
    value: filterByType(ratings, type.id).length,
    color: type.color,
  }));
}
