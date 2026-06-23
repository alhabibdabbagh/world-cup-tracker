import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import MatchCard from './components/MatchCard'
import LoadingState from './components/LoadingState'
import dataService from './data/dataService'

const REFRESH_INTERVAL_MS = 60_000

function App() {
  const tournaments = useMemo(() => dataService.getAvailableTournaments(), [])
  const defaultTournamentYear = tournaments[tournaments.length - 1]?.year || 2026

  const [selectedTournamentYear, setSelectedTournamentYear] = useState(defaultTournamentYear)
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [matches, setMatches] = useState(() => dataService.getAllMatches(defaultTournamentYear))
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dataSource, setDataSource] = useState('static')
  const [apiError, setApiError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const tournamentInfo = dataService.getTournamentInfo(selectedTournamentYear)

  useEffect(() => {
    let isActive = true

    const loadMatches = async (showLoading = false) => {
      if (showLoading) {
        setIsLoading(true)
      } else {
        setIsRefreshing(true)
      }

      const result = await dataService.getMatches(selectedTournamentYear)

      if (!isActive) {
        return
      }

      setMatches(result.matches)
      setDataSource(result.source)
      setApiError(result.error)
      setLastUpdated(result.lastUpdated)
      setIsLoading(false)
      setIsRefreshing(false)
    }

    loadMatches(true)

    const intervalId = window.setInterval(() => {
      loadMatches(false)
    }, REFRESH_INTERVAL_MS)

    return () => {
      isActive = false
      window.clearInterval(intervalId)
    }
  }, [selectedTournamentYear])

  const filteredMatches = useMemo(() => {
    let result = matches
    
    if (activeFilter !== 'ALL') {
      result = dataService.filterMatchesByStatus(matches, activeFilter)
    }

    // Sort: FINISHED first, then by date DESC
    return result.sort((a, b) => {
      // FINISHED matches first
      if (a.status === 'FINISHED' && b.status !== 'FINISHED') return -1
      if (a.status !== 'FINISHED' && b.status === 'FINISHED') return 1
      // Then sort by date DESC (newest first)
      return new Date(b.kickoff) - new Date(a.kickoff)
    })
  }, [activeFilter, matches])

  const handleTournamentChange = (year) => {
    setSelectedTournamentYear(Number(year))
    setActiveFilter('ALL')
  }

  return (
    <div>
      <Header
        tournamentInfo={tournamentInfo}
        tournaments={tournaments}
        selectedTournamentYear={selectedTournamentYear}
        onTournamentChange={handleTournamentChange}
        dataSource={dataSource}
        apiError={apiError}
        lastUpdated={lastUpdated}
        isRefreshing={isRefreshing}
      />

      <div className="container">
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {isLoading ? (
          <LoadingState />
        ) : filteredMatches.length > 0 ? (
          <div className="match-list">
            {filteredMatches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h2>No Matches Found</h2>
            <p>Try selecting a different tournament or filter.</p>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>📊 World Cup Tracker • Free, open-source match information</p>
        <p>
          Data source:{' '}
          {dataSource === 'api'
            ? 'football-data.org live API'
            : 'Local static fallback'}
        </p>
        <p>🔒 API key is protected by serverless proxy</p>
      </footer>
    </div>
  )
}

export default App