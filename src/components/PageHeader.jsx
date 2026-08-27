import { Bell, SlidersHorizontal } from 'lucide-react';
import SearchBar from './SearchBar';
import './PageHeader.css';

export default function PageHeader({
  title,
  description,
  search,
  onSearchChange,
  searchPlaceholder,
  onFilterClick,
  isFilterActive = false,
}) {
  return (
    <div className="page-header">
      <div className="page-header__top">
        <div>
          <h1 className="page-header__title">{title}</h1>
          <p className="page-header__description">{description}</p>
        </div>
        <button type="button" className="page-header__bell" aria-label="Notifications">
          <Bell size={17} />
          <span className="page-header__bell-dot" />
        </button>
      </div>

      {onSearchChange && (
        <div className="page-header__actions">
          <SearchBar value={search} onChange={onSearchChange} placeholder={searchPlaceholder} />
          {onFilterClick && (
            <button
              type="button"
              className={`filter-btn${isFilterActive ? ' is-active' : ''}`}
              onClick={onFilterClick}
            >
              <SlidersHorizontal size={15} />
              Filter
            </button>
          )}
        </div>
      )}
    </div>
  );
}
