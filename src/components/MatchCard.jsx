import StatusBadge from './StatusBadge'
import EventList from './EventList'

/**
 * MatchCard Component
 * Displays a World Cup match with score, teams, and events
 * @param {Object} match - Match data object
 * @param {string} match.id - Unique match identifier
 * @param {Object} match.homeTeam - Home team data
 * @param {Object} match.awayTeam - Away team data
 * @param {Object} match.score - Match score {home, away}
 * @param {string} match.status - Match status (SCHEDULED, LIVE, FINISHED)
 * @param {string} match.kickoff - Match kickoff time
 * @param {string} match.stage - Tournament stage
 * @param {string} match.stadium - Stadium name
 * @param {Array} match.events - Match events
 * @returns {JSX.Element}
 */
function MatchCard({ match }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    })
  }

  const renderTeamFlag = (team) => {
    return <span className="team-flag-emoji">{team.flag || '🏳️'}</span>
  }

  return (
    <div className="match-card">
      <div className="match-header">
        <div className="match-meta">
          <div className="match-stage">{match.stage}</div>
          <div className="match-datetime">
            {formatDate(match.kickoff)} • {formatTime(match.kickoff)}
          </div>
        </div>
        <StatusBadge status={match.status} />
      </div>

      <div className="match-score">
        <div className="teams-container">
          {/* Home Team */}
          <div className="team">
            <div className="team-flag">{renderTeamFlag(match.homeTeam)}</div>
            <div className="team-info">
              <div className="team-name">{match.homeTeam?.name || 'TBD'}</div>
              <div className="team-code">{match.homeTeam?.code || 'TBD'}</div>
            </div>
          </div>

          {/* Score Display */}
          <div className="score-display">
            {match.status === 'FINISHED' || match.status === 'LIVE' ? (
              <>
                <div className="score-numbers">
                  {match.score?.home !== null && match.score?.home !== undefined
                    ? match.score.home
                    : '-'}
                </div>
                <div className="score-separator">—</div>
                <div className="score-numbers">
                  {match.score?.away !== null && match.score?.away !== undefined
                    ? match.score.away
                    : '-'}
                </div>
                {match.status === 'LIVE' && (
                  <div className="score-label">LIVE</div>
                )}
              </>
            ) : (
              <div className="no-score">Not started</div>
            )}
          </div>

          {/* Away Team */}
          <div className="team">
            <div className="team-info">
              <div className="team-name">{match.awayTeam?.name || 'TBD'}</div>
              <div className="team-code">{match.awayTeam?.code || 'TBD'}</div>
            </div>
            <div className="team-flag">{renderTeamFlag(match.awayTeam)}</div>
          </div>
        </div>
      </div>

      {match.stadium && (
        <div className="stadium-info">
          <div className="stadium-name">{match.stadium.name || match.stadium}</div>
          {match.stadium.city && (
            <div className="stadium-location">{match.stadium.city}</div>
          )}
        </div>
      )}

      <EventList events={match.events} />
    </div>
  )
}

export default MatchCard
