function StatusBadge({ status }) {
  const getStatusDisplay = (status) => {
    const statusUpper = status?.toUpperCase()
    switch (statusUpper) {
      case 'SCHEDULED':
        return { text: 'Scheduled', className: 'scheduled' }
      case 'LIVE':
        return { text: '🔴 LIVE', className: 'live' }
      case 'FINISHED':
        return { text: 'Finished', className: 'finished' }
      case 'POSTPONED':
        return { text: 'Postponed', className: 'scheduled' }
      case 'CANCELLED':
        return { text: 'Cancelled', className: 'scheduled' }
      default:
        return { text: status, className: 'scheduled' }
    }
  }

  const { text, className } = getStatusDisplay(status)

  return <span className={`status-badge ${className}`}>{text}</span>
}

export default StatusBadge