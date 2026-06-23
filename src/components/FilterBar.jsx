import { FILTER_OPTIONS } from '../data/constants'

function FilterBar({ activeFilter, onFilterChange }) {
  const filters = FILTER_OPTIONS

  return (
    <div className="container">
      <div className="filter-bar">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterBar