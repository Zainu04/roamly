export default function TrendingStrip({ posts, onOpen }) {
  const top = [...posts]
    .sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))
    .slice(0, 5)

  if (!top.length) return null

  return (
    <div className="trending-strip">
      <div className="trending-label">🔥 Trending</div>
      <div className="trending-cards">
        {top.map((p, i) => (
          <div key={p.id} className="trending-card" onClick={() => onOpen(p.id)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onOpen(p.id)}>
            <span className="trending-rank">#{i + 1}</span>
            <h4>{p.title}</h4>
            <div className="meta">
              <span>↑ {p.upvotes}</span>
              {p.location && <span>📍 {p.location}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
