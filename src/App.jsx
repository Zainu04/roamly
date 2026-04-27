import { useState, useEffect, useRef } from 'react'
import { generateUserId } from './utils/helpers'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import Home from './Pages/Home'
import PostPage from './Pages/PostPage'
import { SAMPLE_POSTS } from './data/samplePosts'
import { SAMPLE_COMMENTS } from './data/sampleComments'

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export default function App() {
  const [userId] = useState(generateUserId)
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('roamly_dark') === 'true'
  )
  const [toasts, setToasts] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [activePostId, setActivePostId] = useState(null)

  const [posts, setPosts] = useState(() =>
    loadFromStorage('roamly_posts', SAMPLE_POSTS)
  )
  const [comments, setComments] = useState(() =>
    loadFromStorage('roamly_comments', SAMPLE_COMMENTS)
  )

  const nextId = useRef(
    Math.max(
      ...loadFromStorage('roamly_posts', SAMPLE_POSTS).map(p => p.id),
      ...loadFromStorage('roamly_comments', SAMPLE_COMMENTS).map(c => c.id),
      100
    ) + 1
  )

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
    localStorage.setItem('roamly_dark', darkMode)
  }, [darkMode])

  // Persist posts and comments whenever they change
  useEffect(() => { saveToStorage('roamly_posts', posts) }, [posts])
  useEffect(() => { saveToStorage('roamly_comments', comments) }, [comments])

  function addToast(message, type = '') {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }

  // ── Post CRUD ──────────────────────────────────────────────────────────────
  function handleSavePost(formData, editId) {
    if (editId) {
      setPosts(p => p.map(x => x.id === editId ? { ...x, ...formData } : x))
      addToast('Post updated!', 'success')
    } else {
      const newPost = {
        ...formData,
        id: nextId.current++,
        upvotes: 0,
        created_at: new Date().toISOString(),
      }
      setPosts(p => [newPost, ...p])
      addToast('Post published! 🎉', 'success')
    }
  }

  function handleDeletePost(id) {
    setPosts(p => p.filter(x => x.id !== id))
    setComments(c => c.filter(x => x.post_id !== id))
    addToast('Post deleted', '')
    setActivePostId(null)
  }

  function handleUpvote(id) {
    setPosts(p => p.map(x =>
      x.id === id ? { ...x, upvotes: (x.upvotes || 0) + 1 } : x
    ))
  }

  // ── Comment CRUD ───────────────────────────────────────────────────────────
  function handleAddComment(postId, text) {
    const newComment = {
      id: nextId.current++,
      post_id: postId,
      text,
      author_id: userId,
      created_at: new Date().toISOString(),
    }
    setComments(c => [...c, newComment])
    addToast('Comment posted', 'success')
  }

  function handleDeleteComment(id) {
    setComments(c => c.filter(x => x.id !== id))
  }

  function openPost(id) {
    setActivePostId(id)
    window.scrollTo(0, 0)
  }

  function goHome() {
    setActivePostId(null)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Navbar
        userId={userId}
        darkMode={darkMode}
        onHome={goHome}
        onToggleDark={() => setDarkMode(d => !d)}
        onShare={() => { goHome(); setShowCreate(true) }}
      />

      {activePostId === null ? (
        <Home
          userId={userId}
          posts={posts}
          loading={false}
          addToast={addToast}
          showCreate={showCreate}
          setShowCreate={setShowCreate}
          onOpenPost={openPost}
          onSavePost={handleSavePost}
          onUpvote={handleUpvote}
        />
      ) : (
        <PostPage
          postId={activePostId}
          posts={posts}
          comments={comments}
          userId={userId}
          onBack={goHome}
          onUpvote={handleUpvote}
          onDelete={handleDeletePost}
          onSavePost={handleSavePost}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      )}

      <Toast toasts={toasts} />
    </>
  )
}
