import { STATUS_DISPLAY } from '../data/constants'

function StatusBadge({ status }) {
  const getStatusDisplay = (status) => {
    const statusUpper = status?.toUpperCase()
    return STATUS_DISPLAY[statusUpper] || { text: status, className: 'scheduled' }
  }

  const { text, className } = getStatusDisplay(status)

  return <span className={`status-badge ${className}`}>{text}</span>
}

export default StatusBadge