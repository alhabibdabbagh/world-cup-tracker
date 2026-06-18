function FilterBar({ activeFilter, onFilterChange }) {
  const filters = [
    { key: 'ALL', label: 'All Matches' },
    { key: 'SCHEDULED', label: 'Scheduled' },
    { key: 'LIVE', label: 'Live' },
    { key: 'FINISHED', label: 'Finished' }
  ]

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