import { useState } from 'react'

function EventList({ events = [] }) {
  const [expanded, setExpanded] = useState(false)

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

  const getEventIcon = (type) => {
    switch (type?.toUpperCase()) {
      case 'GOAL':
        return '⚽'
      case 'YELLOW_CARD':
        return '🟨'
      case 'RED_CARD':
        return '🟥'
      case 'SUBSTITUTION':
        return '🔄'
      default:
        return '•'
    }
  }

  const getEventTypeClass = (type) => {
    switch (type?.toUpperCase()) {
      case 'GOAL':
        return 'goal'
      case 'YELLOW_CARD':
        return 'yellow-card'
      case 'RED_CARD':
        return 'red-card'
      case 'SUBSTITUTION':
        return 'substitution'
      default:
        return ''
    }
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
              <span className={`event-type ${getEventTypeClass(event.type)}`}>
                {getEventIcon(event.type)} {formatEventType(event.type)}
              </span>
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