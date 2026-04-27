import { useState } from 'react'
import { getInitials, timeAgo, formatDate } from '../utils/helpers'
import PostModal from '../components/PostModal'

export default function PostPage({
  postId, posts, comments, userId,
  onBack, onUpvote, onDelete, onSavePost,
  onAddComment, onDeleteComment,
}) {
  const post = posts.find(p => p.id === postId)
  const postComments = comments.filter(c => c.post_id === postId)
  const [commentText, setCommentText] = useState('')
  const [bumped, setBumped] = useState(false)
  const [imgErr, setImgErr] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [editingPost, setEditingPost] = useState(null)

  if (!post) return (
    <div className="page-container">
      <div className="main-content">
        <div className="post-page">
          <button className="post-page-back" onClick={onBack}>← Back to feed</button>
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>Post not found</h3>
          </div>
        </div>
      </div>
    </div>
  )

  function handleUpvote() {
    onUpvote(post.id)
    setBumped(true)
    setTimeout(() => setBumped(false), 300)
  }

  async function handleComment() {
    if (!commentText.trim()) return
    setSubmitting(true)
    await onAddComment(post.id, commentText)
    setCommentText('')
    setSubmitting(false)
  }

  async function handleSave(formData, editId) {
    await onSavePost(formData, editId)
    setEditingPost(null)
  }

  const isOwner = post.author_id === userId

  return (
    <div className="page-container">
      <div className="main-content">
        <div className="post-page">
          <button className="post-page-back" onClick={onBack}>← Back to feed</button>

          {post.image_url && !imgErr && (
            <img
              src={post.image_url}
              alt={post.title}
              className="post-page-image"
              onError={() => setImgErr(true)}
            />
          )}

          <div className="post-page-meta">
            {post.category && (
              <span className={`cat-badge cat-${post.category}`}>{post.category}</span>
            )}
            {post.location && (
              <span className="location-badge">📍 {post.location}</span>
            )}
            <span style={{ fontSize: '13px', color: 'var(--ink-light)' }}>
              {formatDate(post.created_at)}
            </span>
          </div>

          <h1 className="post-page-title">{post.title}</h1>

          <div className="post-author-bar">
            <div className="author-info">
              <div
                className="author-avatar"
                style={{ background: isOwner ? 'var(--terracotta)' : 'var(--sage)' }}
              >
                {getInitials(post.author_id)}
              </div>
              <div>
                <div className="author-name">
                  {post.author_id}
                  {isOwner && (
                    <span style={{ fontSize: '11px', color: 'var(--terracotta)', marginLeft: '4px' }}>
                      · You
                    </span>
                  )}
                </div>
                <div className="author-time">{timeAgo(post.created_at)}</div>
              </div>
            </div>
            <div className="post-page-actions">
              <button
                className={`upvote-btn${bumped ? ' bump' : ''}`}
                onClick={handleUpvote}
                title="Upvote this post"
              >
                ↑ {post.upvotes || 0} {post.upvotes === 1 ? 'upvote' : 'upvotes'}
              </button>
            </div>
          </div>

          {post.content && (
            <p className="post-page-content">{post.content}</p>
          )}

          {isOwner && (
            <div className="post-edit-bar">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setEditingPost(post)}
              >
                ✏️ Edit post
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  if (window.confirm('Delete this post? This cannot be undone.')) {
                    onDelete(post.id)
                  }
                }}
              >
                🗑 Delete post
              </button>
            </div>
          )}

          {/* COMMENTS */}
          <div className="comments-section">
            <h2 className="comments-title">
              {postComments.length === 0
                ? 'Be the first to comment'
                : `${postComments.length} comment${postComments.length !== 1 ? 's' : ''}`}
            </h2>

            <div className="comment-form">
              <div className="comment-input-row">
                <div className="comment-avatar">{getInitials(userId)}</div>
                <div className="comment-input-wrap">
                  <textarea
                    className="form-textarea"
                    style={{ minHeight: '80px', marginBottom: '10px' }}
                    placeholder="Share your thoughts, tips, or questions…"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) handleComment() }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={handleComment}
                      disabled={!commentText.trim() || submitting}
                    >
                      {submitting ? 'Posting…' : 'Post comment'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {postComments.length === 0 ? (
              <div className="no-comments">No comments yet. Start the conversation!</div>
            ) : (
              <div className="comment-list">
                {postComments.map(c => (
                  <div key={c.id} className="comment-item">
                    <div
                      className="comment-avatar"
                      style={{ width: 32, height: 32, fontSize: 11, background: 'var(--sage)' }}
                    >
                      {getInitials(c.author_id)}
                    </div>
                    <div className="comment-body">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span className="comment-author">{c.author_id}</span>
                          {c.author_id === userId && (
                            <span style={{ fontSize: '11px', color: 'var(--terracotta)', marginLeft: '6px' }}>
                              · You
                            </span>
                          )}
                        </div>
                        {c.author_id === userId && (
                          <button
                            className="comment-delete"
                            onClick={() => onDeleteComment(c.id)}
                          >
                            ✕ delete
                          </button>
                        )}
                      </div>
                      <p className="comment-text">{c.text}</p>
                      <div className="comment-time">{timeAgo(c.created_at)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingPost && (
        <PostModal
          post={editingPost}
          userId={userId}
          onClose={() => setEditingPost(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
