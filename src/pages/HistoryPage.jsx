import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import RatingsGrid from '../components/RatingsGrid';
import { useRatings } from '../context/useRatings';
import { filterByTypes, filterByTitle, sortRatings, SORT_OPTIONS } from '../utils/ratings';

const DEFAULT_SORT = 'date-desc';

export default function HistoryPage({ typeIds, title, description, searchPlaceholder, emptyTitle, emptyHint }) {
  const { ratings, status, toggleFavourite } = useRatings();
  const [search, setSearch] = useState('');
  const [sortId, setSortId] = useState(DEFAULT_SORT);
  const [showFilter, setShowFilter] = useState(false);

  const filtered = useMemo(() => {
    let result = filterByTypes(ratings, typeIds);
    result = filterByTitle(result, search);
    return sortRatings(result, sortId);
  }, [ratings, typeIds, search, sortId]);

  const hasActiveFilter = sortId !== DEFAULT_SORT;

  return (
    <div className="page">
      <PageHeader
        title={title}
        description={description}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={searchPlaceholder}
        onFilterClick={() => setShowFilter((prev) => !prev)}
        isFilterActive={hasActiveFilter}
      />

      {showFilter && (
        <div className="page-filter-panel">
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
            <button type="button" className="btn btn--ghost" onClick={() => setSortId(DEFAULT_SORT)}>
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
          emptyTitle={emptyTitle}
          emptyHint={emptyHint}
        />
      )}
    </div>
  );
}
