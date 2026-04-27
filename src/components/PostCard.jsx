import { useState } from 'react'
import { timeAgo } from '../utils/helpers'

export default function PostCard({ post, onOpen, onUpvote }) {
  const [imgErr, setImgErr] = useState(false)
  const [bumped, setBumped] = useState(false)

  function handleUpvote(e) {
    e.stopPropagation()
    onUpvote(post.id)
    setBumped(true)
    setTimeout(() => setBumped(false), 300)
  }

  return (
    <div className="post-card" onClick={() => onOpen(post.id)}>
      <div className="post-card-img-wrap">
        {post.image_url && !imgErr ? (
          <img
            className="post-card-image"
            src={post.image_url}
            alt={post.title}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="post-card-no-image">
            <span className="placeholder-icon">🌍</span>
          </div>
        )}
        {post.category && (
          <span className={`cat-badge cat-${post.category}`}>{post.category}</span>
        )}
      </div>

      <div className="post-card-body">
        <h3 className="post-card-title">{post.title}</h3>
        {post.location && (
          <div className="post-card-location">{post.location}</div>
        )}
        <div className="post-card-footer">
          <span className="post-card-time">{timeAgo(post.created_at)}</span>
          <button
            className={`upvote-pill${bumped ? ' bump' : ''}`}
            onClick={handleUpvote}
            title="Upvote this post"
          >
            ↑ {post.upvotes || 0}
          </button>
        </div>
      </div>
    </div>
  )
}
