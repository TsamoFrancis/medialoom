import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import RatingsGrid from '../components/RatingsGrid';
import { useRatings } from '../context/useRatings';
import { filterByType, filterByTitle, sortRatings, SORT_OPTIONS } from '../utils/ratings';
import { GENRES_BY_TYPE } from '../constants/mediaTypes';

const DEFAULT_SORT = 'rating-desc';

export default function TypeLibraryPage({ typeId, typeLabel, title, description }) {
  const { ratings, status, toggleFavourite } = useRatings();
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [sortId, setSortId] = useState(DEFAULT_SORT);
  const [showFilter, setShowFilter] = useState(false);

  const filtered = useMemo(() => {
    let result = filterByType(ratings, typeId);
    result = filterByTitle(result, search);
    if (genre) result = result.filter((entry) => entry.genre === genre);
    return sortRatings(result, sortId);
  }, [ratings, typeId, search, genre, sortId]);

  const hasActiveFilter = Boolean(genre) || sortId !== DEFAULT_SORT;

  const clearFilters = () => {
    setGenre('');
    setSortId(DEFAULT_SORT);
  };

  return (
    <div className="page">
      <PageHeader
        title={title}
        description={description}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={`Search your ${typeLabel.toLowerCase()}...`}
        onFilterClick={() => setShowFilter((prev) => !prev)}
        isFilterActive={hasActiveFilter}
      />

      {showFilter && (
        <div className="page-filter-panel">
          <label>
            Genre
            <div className="select-shell">
              <select value={genre} onChange={(event) => setGenre(event.target.value)}>
                <option value="">All genres</option>
                {GENRES_BY_TYPE[typeId].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <ChevronDown size={16} className="select-shell__icon" />
            </div>
          </label>

          <label>
            Sort by
            <div className="select-shell">
              <select value={sortId} onChange={(event) => setSortId(event.target.value)}>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              <ChevronDown size={16} className="select-shell__icon" />
            </div>
          </label>

          {hasActiveFilter && (
            <button type="button" className="btn btn--ghost" onClick={clearFilters}>
              Clear
            </button>
          )}
        </div>
      )}

      {status === 'loading' && <p className="page__status">Loading…</p>}
      {status === 'error' && (
        <p className="page__status page__status--error">
          Can't reach the server. Make sure the PHP server is running, then refresh this page.
        </p>
      )}
      {status === 'ready' && (
        <RatingsGrid
          ratings={filtered}
          onToggleFavourite={toggleFavourite}
          emptyTitle={`No ${typeLabel.toLowerCase()} rated yet.`}
          emptyHint={`Click "+ Add New Rating" in the sidebar and choose ${typeLabel} as the type — it'll show up here automatically.`}
        />
      )}
    </div>
  );
}
