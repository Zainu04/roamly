export default function SkeletonGrid() {
  return (
    <div className="posts-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton skeleton-img" />
          <div className="skeleton-body">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-sub" />
            <div className="skeleton skeleton-footer" />
          </div>
        </div>
      ))}
    </div>
  )
}
