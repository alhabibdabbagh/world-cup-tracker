function Header({ tournamentInfo }) {
  const now = new Date()
  const formattedTime = now.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <header className="header">
      <div className="container">
        <h1>⚽ World Cup Tracker</h1>
        <p>Free, real-time World Cup match information</p>
        {tournamentInfo && (
          <div className="tournament-info">
            <p>{tournamentInfo.tournament} • {tournamentInfo.country} {tournamentInfo.year}</p>
          </div>
        )}
        <div className="last-updated">
          Last updated: {formattedTime}
        </div>
      </div>
    </header>
  )
}

export default Header