import { useState } from 'react'
import PostCard from '../components/PostCard'
import PostModal from '../components/PostModal'
import TrendingStrip from '../components/TrendingStrip'
import SkeletonGrid from '../components/SkeletonGrid'
import { CATEGORIES } from '../data/samplePosts'

export default function Home({
  userId, posts, loading, addToast,
  showCreate, setShowCreate,
  onOpenPost, onSavePost, onUpvote,
}) {
  const [editingPost, setEditingPost] = useState(null)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('created_at')
  const [activeCategory, setActiveCategory] = useState('All')

  async function handleSave(formData, editId) {
    await onSavePost(formData, editId)
    setEditingPost(null)
    setShowCreate(false)
  }

  // Filter + sort
  let displayPosts = [...posts]
  if (activeCategory !== 'All') displayPosts = displayPosts.filter(p => p.category === activeCategory)
  if (search.trim()) {
    const q = search.toLowerCase()
    displayPosts = displayPosts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.location || '').toLowerCase().includes(q) ||
      (p.content || '').toLowerCase().includes(q)
    )
  }
  if (sortBy === 'upvotes') {
    displayPosts.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))
  } else {
    displayPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  }

  return (
    <div className="page-container">
      <div className="main-content">

        {/* HERO */}
        <div className="hero">
          <div className="hero-eyebrow">Travel · Photography · Community</div>
          <h1>The world through <em>your</em> lens</h1>
          <p>Share your travel stories, discover hidden gems, and connect with explorers around the globe.</p>
        </div>

        {/* FILTER BAR */}
        <div className="filter-bar">
          <input
            className="search-input"
            placeholder="Search destinations, stories, experiences…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search posts by title"
          />
          <div className="filter-divider" />
          <select
            className="filter-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            aria-label="Sort posts"
          >
            <option value="created_at">Newest first</option>
            <option value="upvotes">Most upvoted</option>
          </select>
          <button className="btn btn-primary btn-sm" onClick={() => setShowCreate(true)}>
            + Share a story
          </button>
        </div>

        {/* CATEGORY TABS */}
        <div className="category-tabs">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`cat-tab${activeCategory === c ? ' active' : ''}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* TRENDING STRIP */}
        {!search && activeCategory === 'All' && posts.length > 0 && (
          <TrendingStrip posts={posts} onOpen={onOpenPost} />
        )}

        {/* SECTION HEADER */}
        <div className="section-header">
          <h2 className="section-title">
            <span className="dot" />
            {search
              ? `Results for "${search}"`
              : activeCategory !== 'All'
                ? activeCategory
                : sortBy === 'upvotes'
                  ? 'Most loved'
                  : 'Recent posts'}
          </h2>
        </div>

        {/* POSTS GRID */}
        {loading ? (
          <SkeletonGrid />
        ) : displayPosts.length === 0 ? (
          <div className="posts-grid">
            <div className="empty-state">
              <div className="empty-icon">{search ? '🔍' : '🌍'}</div>
              <h3>{search ? 'Nothing found' : 'No posts yet'}</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                {search
                  ? 'Try a different search term or browse all posts.'
                  : 'Be the first to share a travel story!'}
              </p>
              {!search && (
                <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
                  Share your first story
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="posts-grid masonry">
            {displayPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onOpen={onOpenPost}
                onUpvote={onUpvote}
              />
            ))}
          </div>
        )}

        {/* MODALS */}
        {showCreate && (
          <PostModal
            userId={userId}
            onClose={() => setShowCreate(false)}
            onSave={handleSave}
          />
        )}
        {editingPost && (
          <PostModal
            post={editingPost}
            userId={userId}
            onClose={() => setEditingPost(null)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  )
}
