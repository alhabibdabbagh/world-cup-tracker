import { useState } from 'react'
import StatusBadge from './StatusBadge'
import EventList from './EventList'

const FLAG_CODES = {
  QAT: 'qa',
  ECU: 'ec',
  SEN: 'sn',
  NED: 'nl',
  ENG: 'gb-eng',
  IRN: 'ir',
  USA: 'us',
  WAL: 'gb-wls',
  ARG: 'ar',
  KSA: 'sa',
  MEX: 'mx',
  POL: 'pl',
  FRA: 'fr',
  AUS: 'au',
  DEN: 'dk',
  TUN: 'tn',
  ESP: 'es',
  CRC: 'cr',
  GER: 'de',
  JPN: 'jp',
  BEL: 'be',
  CAN: 'ca',
  MAR: 'ma',
  CRO: 'hr',
  BRA: 'br',
  SRB: 'rs',
  SUI: 'ch',
  CMR: 'cm',
  POR: 'pt',
  GHA: 'gh',
  URU: 'uy',
  KOR: 'kr',
  TUR: 'tr'
}

function getFlagCode(team) {
  return team.flagCode || team.countryCode || FLAG_CODES[team.code?.toUpperCase()]
}

function TeamFlag({ team }) {
  const [hasError, setHasError] = useState(false)
  const flagCode = getFlagCode(team)
  const flagUrl = team.flagUrl || (flagCode ? `https://flagcdn.com/w40/${flagCode}.png` : null)

  if (!flagUrl || hasError) {
    return <span className="team-flag-emoji">{team.flag || '🏳️'}</span>
  }

  return (
    <img
      className="team-flag-img"
      src={flagUrl}
      alt={`${team.name} flag`}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  )
}

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
            <div className="team-flag">
              <TeamFlag team={match.homeTeam} />
            </div>
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
            <div className="team-flag">
              <TeamFlag team={match.awayTeam} />
            </div>
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