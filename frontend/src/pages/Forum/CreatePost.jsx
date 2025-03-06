//src/pages/Forum/CreatePost.jsx
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('general-discussion')
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/forum/posts`, {
        title,
        content,
        category
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      navigate('/')
    } catch (error) {
      alert(error.response.data.error)
    }
  }

  if (!user) return <div>Please login to create posts</div>

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Post Title"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <select
              className="input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="safety-tips">Safety Tips</option>
              <option value="incident-reports">Incident Reports</option>
              <option value="general-discussion">General Discussion</option>
            </select>
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Post Content"
              className="input-field h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Create Post</button>
        </form>
      </div>
    </div>
  )
}