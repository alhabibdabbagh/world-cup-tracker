import { useState, useMemo } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import MatchCard from './components/MatchCard'
import dataService from './data/dataService'

function App() {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const tournamentInfo = dataService.getTournamentInfo()
  const allMatches = dataService.getAllMatches()

  const filteredMatches = useMemo(() => {
    if (activeFilter === 'ALL') {
      return allMatches
    }
    return dataService.getMatchesByStatus(activeFilter)
  }, [activeFilter, allMatches])

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  return (
    <div>
      <Header tournamentInfo={tournamentInfo} />
      
      <div className="container">
        <FilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        {filteredMatches.length > 0 ? (
          <div className="match-list">
            {filteredMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h2>No Matches Found</h2>
            <p>Try selecting a different filter or check back later.</p>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>📊 World Cup Tracker • Free, open-source match information</p>
        <p>Data source: Local static dataset • No external API required</p>
        <p>🔒 Your privacy is protected • No tracking, no cookies</p>
      </footer>
    </div>
  )
}

export default App