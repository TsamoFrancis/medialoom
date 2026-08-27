import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import RatingsTable from '../components/RatingsTable';
import { useRatings } from '../context/useRatings';
import { filterByType, filterByTitle, sortRatings, SORT_OPTIONS } from '../utils/ratings';
import { MEDIA_TYPES } from '../constants/mediaTypes';

const DEFAULT_SORT = 'rating-desc';
const DEFAULT_TYPE = 'all';

export default function AllRatingsPage() {
  const { ratings, status, removeRating } = useRatings();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(() => searchParams.get('q') || '');
  const [typeFilter, setTypeFilter] = useState(DEFAULT_TYPE);
  const [sortId, setSortId] = useState(DEFAULT_SORT);
  const [showFilter, setShowFilter] = useState(false);

  const filtered = useMemo(() => {
    let result = filterByType(ratings, typeFilter);
    result = filterByTitle(result, search);
    return sortRatings(result, sortId);
  }, [ratings, typeFilter, search, sortId]);

  const hasActiveFilter = typeFilter !== DEFAULT_TYPE || sortId !== DEFAULT_SORT;

  const clearFilters = () => {
    setTypeFilter(DEFAULT_TYPE);
    setSortId(DEFAULT_SORT);
  };

  return (
    <div className="page">
      <PageHeader
        title="All Ratings"
        description="View and manage all your ratings in one place."
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search ratings..."
        onFilterClick={() => setShowFilter((prev) => !prev)}
        isFilterActive={hasActiveFilter}
      />

      {showFilter && (
        <div className="page-filter-panel">
          <label>
            Type
            <div className="select-shell">
              <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
                <option value="all">All Types</option>
                {MEDIA_TYPES.map(({ id, label }) => (
                  <option key={id} value={id}>{label}</option>
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

      {status === 'loading' && <p className="page__status">Loading your ratings…</p>}
      {status === 'error' && (
        <p className="page__status page__status--error">
          Can't reach the server. Make sure the PHP server is running, then refresh this page.
        </p>
      )}
      {status === 'ready' && <RatingsTable ratings={filtered} onDelete={removeRating} />}
    </div>
  );
}
