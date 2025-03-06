// src/pages/Home.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from '../components/PostCard'
import { useSocket } from '../contexts/SocketContext'

export default function Home() {
  const [posts, setPosts] = useState([])
  const socket = useSocket()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/forum/posts`
        )
        setPosts(data.data)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setPosts([])
      }
    }
    fetchPosts()

    if (socket) {
      socket.on('new-post', (post) => {
        setPosts((prev) => [post, ...prev])
      })

      socket.on('delete-post', (postId) => {
        setPosts((prev) => prev.filter((p) => p._id !== postId))
      })
    }
  }, [socket])

  return (
    <div className="relative min-h-screen">
      {/* Grid Background */}
      <div className="absolute inset-0 -z-10 h-full w-full 
        bg-white 
        bg-[linear-gradient(to_right,rgba(128,128,128,0.04)_1px,transparent_1px),
        linear-gradient(to_bottom,rgba(128,128,128,0.04)_1px,transparent_1px)]
        bg-[size:24px_24px]
        dark:bg-dark-900
        dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),
        linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" 
      />

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}