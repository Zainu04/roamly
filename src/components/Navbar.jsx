import { getInitials } from '../utils/helpers'

export default function Navbar({ userId, darkMode, onHome, onToggleDark, onShare }) {
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={onHome} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onHome()}>
        <div className="lens-icon" />
        Roamly
      </div>
      <div className="nav-actions">
        <button className="theme-toggle" onClick={onToggleDark} title="Toggle theme">
          {darkMode ? '☀️' : '🌙'}
        </button>
        <div className="user-badge">
          <div className="user-avatar">{getInitials(userId)}</div>
          {userId}
        </div>
        <button className="btn btn-primary btn-sm" onClick={onShare}>
          + Share
        </button>
      </div>
    </nav>
  )
}
