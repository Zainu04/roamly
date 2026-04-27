import { useState } from 'react'

const CATEGORY_OPTIONS = ['Adventure', 'Food', 'Nature', 'City', 'Culture']

export default function PostModal({ post, userId, onClose, onSave }) {
  const isEditing = Boolean(post?.id)
  const [form, setForm] = useState({
    title: post?.title || '',
    content: post?.content || '',
    image_url: post?.image_url || '',
    location: post?.location || '',
    category: post?.category || '',
  })
  const [preview, setPreview] = useState(post?.image_url || '')
  const [imgErr, setImgErr] = useState(false)
  const [saving, setSaving] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (name === 'image_url') {
      setPreview(value)
      setImgErr(false)
    }
  }

  async function handleSubmit() {
    if (!form.title.trim()) return
    setSaving(true)
    await onSave({ ...form, author_id: userId }, post?.id)
    setSaving(false)
    onClose()
  }

  return (
    <div
      className="modal-backdrop"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            {isEditing ? 'Edit post' : 'Share your journey'}
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label" htmlFor="post-title">
              Title <span className="required">*</span>
            </label>
            <input
              id="post-title"
              name="title"
              className="form-input"
              placeholder="Where did you go? What did you discover?"
              value={form.title}
              onChange={handleChange}
              maxLength={120}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="post-location">Location</label>
              <input
                id="post-location"
                name="location"
                className="form-input"
                placeholder="Paris, Bali, Tokyo…"
                value={form.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="post-category">Category</label>
              <select
                id="post-category"
                name="category"
                className="form-select"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">— Pick one —</option>
                {CATEGORY_OPTIONS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="post-content">Your story</label>
            <textarea
              id="post-content"
              name="content"
              className="form-textarea"
              placeholder="Tell us about the experience, the people, the smells, the moments…"
              value={form.content}
              onChange={handleChange}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="post-image">Image URL</label>
            <input
              id="post-image"
              name="image_url"
              className="form-input"
              placeholder="https://images.unsplash.com/…"
              value={form.image_url}
              onChange={handleChange}
            />
            {preview && !imgErr && (
              <div className="form-img-preview">
                <img src={preview} alt="preview" onError={() => setImgErr(true)} />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!form.title.trim() || saving}
            >
              {saving ? 'Saving…' : isEditing ? 'Save changes' : 'Publish post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
