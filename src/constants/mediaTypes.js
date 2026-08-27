import { Film, BookOpen, Tv, Ghost } from 'lucide-react';

// Single source of truth for the four media types. Anything that needs a
// type's label, icon, or color reads from here instead of hardcoding it,
// so the sidebar, badges, and this form can never drift out of sync.
export const MEDIA_TYPES = [
  { id: 'movie', label: 'Movie', icon: Film, color: '#3b82f6' },
  { id: 'book', label: 'Book', icon: BookOpen, color: '#22c55e' },
  { id: 'tv', label: 'TV Series', icon: Tv, color: '#a855f7' },
  { id: 'anime', label: 'Anime', icon: Ghost, color: '#f97316' },
];

export const getMediaType = (id) => MEDIA_TYPES.find((type) => type.id === id);

// Genres are scoped per type on purpose — an earlier version of this data
// let Anime and Movie share one genre list, which is how "Self Help" and
// "Finance" ended up as Anime genres in the mock data. Keeping each type's
// list separate makes that class of bug impossible.
export const GENRES_BY_TYPE = {
  movie: ['Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Fantasy', 'Documentary', 'Animation', 'Crime'],
  book: ['Fiction', 'Non-Fiction', 'Self Help', 'Fantasy', 'Biography', 'Finance', 'Mystery', 'Romance', 'Sci-Fi', 'Historical'],
  tv: ['Drama', 'Comedy', 'Crime', 'Sci-Fi', 'Fantasy', 'Thriller', 'Reality', 'Documentary', 'Animation'],
  anime: ['Action', 'Adventure', 'Fantasy', 'Romance', 'Slice of Life', 'Mystery', 'Supernatural', 'Sports', 'Comedy', 'Drama'],
};

// Status labels vary too — a book is "Read", not "Watched".
export const STATUS_BY_TYPE = {
  movie: ['Watched', 'Watching', 'Plan to Watch', 'Dropped'],
  book: ['Read', 'Reading', 'Plan to Read', 'Dropped'],
  tv: ['Watched', 'Watching', 'Plan to Watch', 'Dropped'],
  anime: ['Watched', 'Watching', 'Plan to Watch', 'Dropped'],
};

export const REVIEW_MAX_LENGTH = 400;

// Keyed by the status string itself rather than by type, since "Watched"
// and "Read" never collide across types and this stays a flat lookup.
export const STATUS_COLORS = {
  Watched: '#22c55e',
  Read: '#22c55e',
  Watching: '#3b82f6',
  Reading: '#3b82f6',
  'Plan to Watch': '#9198ab',
  'Plan to Read': '#9198ab',
  Dropped: '#ef4444',
};
