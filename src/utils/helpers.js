export function generateUserId() {
  const stored = localStorage.getItem('roamly_user_id')
  if (stored) return stored
  const id = `Traveler_${Math.floor(1000 + Math.random() * 9000)}`
  localStorage.setItem('roamly_user_id', id)
  return id
}

export function getInitials(name = '') {
  return (name.split('_')[0][0] || '?').toUpperCase()
}

export function timeAgo(dateString) {
  const diff = (Date.now() - new Date(dateString)) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
