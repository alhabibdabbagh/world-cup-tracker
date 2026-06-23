import { useState } from 'react'
import { EVENT_TYPES } from '../data/constants'

function EventList({ events = [], matchStatus = null }) {
  const [expanded, setExpanded] = useState(false)

  // Don't show events for matches that haven't been played yet
  const isMatchNotYetPlayed = matchStatus === 'SCHEDULED' || matchStatus === 'TIMED'
  if (isMatchNotYetPlayed) {
    return (
      <div className="events-section">
        <div className="empty-events">
          Match not yet played
        </div>
      </div>
    )
  }

  if (!events || events.length === 0) {
    return (
      <div className="events-section">
        <button
          className={`events-toggle ${expanded ? 'expanded' : ''}`}
          onClick={() => setExpanded(!expanded)}
        >
          <span>📋 Events ({events?.length || 0})</span>
          <span style={{ marginLeft: 'auto' }}>{expanded ? '▲' : '▼'}</span>
        </button>
        {expanded && (
          <div className="events-list">
            <div className="empty-events">
              No detailed event data available
            </div>
          </div>
        )}
      </div>
    )
    }

  const getEventDisplay = (type) => {
    const typeUpper = type?.toUpperCase()
    return EVENT_TYPES[typeUpper] || { icon: '•', class: '', label: type }
  }

  const formatEventType = (type) => {
    return type?.replace(/_/g, ' ') || 'Event'
  }

  return (
    <div className="events-section">
      <button
        className={`events-toggle ${expanded ? 'expanded' : ''}`}
        onClick={() => setExpanded(!expanded)}
      >
        <span>📋 Events ({events.length})</span>
        <span style={{ marginLeft: 'auto' }}>{expanded ? '▲' : '▼'}</span>
      </button>
      {expanded && (
        <div className="events-list">
          {events.map(event => (
            <div key={event.id} className="event">
                            <span className="event-minute">{event.minute}'</span>
              {(() => {
                const display = getEventDisplay(event.type)
                return (
                  <span className={`event-type ${display.class}`}>
                    {display.icon} {formatEventType(event.type)}
                  </span>
                )
              })()}
              <span className="event-player">{event.player}</span>
              {event.description && (
                <span className="event-description"> ({event.description})</span>
              )}
              <span className="event-team"> • {event.team}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EventList