//src/pages/Forum/PostDetails.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReplyCard from '../../components/ReplyCard'
import { useSocket } from '../../contexts/SocketContext'

export default function PostDetails() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [replyContent, setReplyContent] = useState('')
  const socket = useSocket()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/forum/posts/${id}`)
        setPost(data.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPost()

    if (socket) {
      socket.on('new-reply', (reply) => {
        setPost(prev => ({ ...prev, replies: [...prev.replies, reply] }))
      })
    }
  }, [id, socket])

  const handleReply = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/forum/posts/${id}/replies`,
        { content: replyContent },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setReplyContent('')
    } catch (error) {
      alert(error.response.data.error)
    }
  }

  if (!post) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card mb-8">
        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-6">{post.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Category: {post.category.replace('-', ' ')}</span>
          <span>Anonymous ID: {post.anonymousId}</span>
        </div>
      </div>

      <form onSubmit={handleReply} className="card mb-6">
        <textarea
          className="input-field h-32 mb-4"
          placeholder="Write your reply..."
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">Post Reply</button>
      </form>

      <div className="space-y-4">
        {post.replies.map(reply => (
          <ReplyCard key={reply._id} reply={reply} />
        ))}
      </div>
    </div>
  )
}