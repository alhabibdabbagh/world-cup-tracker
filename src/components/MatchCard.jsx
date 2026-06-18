import StatusBadge from './StatusBadge'
import EventList from './EventList'

function MatchCard({ match }) {
  const formatDate = (dateString) => {
    const options = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const hasScore = match.score.home !== null && match.score.away !== null

  return (
    <div className="match-card">
      <div className="match-header">
        <div className="match-meta">
          {match.stage && <div className="match-stage">{match.stage}</div>}
          {match.group && <div className="match-stage">Group {match.group}</div>}
          <div className="match-datetime">{formatDate(match.kickoff)}</div>
        </div>
        <StatusBadge status={match.status} />
      </div>

      <div className="match-score">
        <div className="teams-container">
          <div className="team">
            <div className="team-flag">{match.homeTeam.flag}</div>
            <div className="team-info">
              <div className="team-name">{match.homeTeam.name}</div>
              <div className="team-code">{match.homeTeam.code}</div>
            </div>
          </div>

          <div className="score-display">
            {hasScore ? (
              <>
                <div className="score-numbers">
                  {match.score.home} <span className="score-separator">-</span> {match.score.away}
                </div>
                {match.status === 'LIVE' && match.minute && (
                  <div className="score-label">{match.minute}'</div>
                )}
              </>
            ) : (
              <div className="no-score">vs</div>
            )}
          </div>

          <div className="team" style={{ justifyContent: 'flex-end' }}>
            <div className="team-info" style={{ alignItems: 'flex-end' }}>
              <div className="team-name">{match.awayTeam.name}</div>
              <div className="team-code">{match.awayTeam.code}</div>
            </div>
            <div className="team-flag">{match.awayTeam.flag}</div>
          </div>
        </div>
      </div>

      {match.stadium && (
        <div className="stadium-info">
          <div className="stadium-name">🏟️ {match.stadium.name}</div>
          <div className="stadium-location">
            {match.stadium.city}, {match.stadium.country}
          </div>
        </div>
      )}

      <EventList events={match.events} />
    </div>
  )
}

export default MatchCard