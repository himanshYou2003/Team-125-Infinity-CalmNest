// src/pages/Home.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import PostCard from '../components/PostCard'
import { useSocket } from '../contexts/SocketContext'
import { Link } from 'react-router-dom'

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
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
      {/* Hero Section */}
      <div className="relative pt-24 pb-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fade-in">
            Where Safety<br/>
            <span className="bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
              Feels like home <span className='text-gray-800'>🏠</span>
            </span>
          </h1>
          
          <div className="flex justify-center space-x-4 mb-12">
            <button className="btn-glow px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-all">
              <Link to={'/chat'}> Join Our Community</Link>
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-purple-900 transition-all">
            <Link to={'/ngos'}> NGOs</Link>
            </button>
          </div>
  
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
            <div className="safety-stat-card">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
            <div className="safety-stat-card">
              <div className="text-3xl font-bold">150+</div>
              <div className="text-sm">Safety Partners</div>
            </div>
            <div className="safety-stat-card">
              <div className="text-3xl font-bold">1M+</div>
              <div className="text-sm">Women Protected</div>
            </div>
            <div className="safety-stat-card">
              <div className="text-3xl font-bold">85%</div>
              <div className="text-sm">Response Rate</div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Inspirational Section */}
      <div className="py-20 px-6 bg-white/10 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="quote-card bg-pink-500/20">
            <div className="text-6xl text-pink-400">“</div>
            <p className="text-xl text-white italic">
              The strength of a woman is not measured by the impact that all her hardships in life have had on her; 
              but the strength of a woman is measured by the extent of her refusal to allow those hardships to dictate her future.
            </p>
            <div className="mt-4 font-bold text-pink-200">- Unknown Survivor</div>
          </div>
  
          <div className="space-y-8">
            <div className="safety-tip-card hover:transform hover:scale-105 transition-all">
              <div className="text-purple-400 text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-2">Real-time Protection Network</h3>
              <p className="text-gray-200">Instant alerts to nearby community members and authorities</p>
            </div>
            
            <div className="safety-tip-card hover:transform hover:scale-105 transition-all">
              <div className="text-blue-400 text-3xl mb-4">👭</div>
              <h3 className="text-xl font-bold text-white mb-2">Sisterhood Circles</h3>
              <p className="text-gray-200">Join local safety groups and travel together</p>
            </div>
          </div>
        </div>
      </div>
  
      {/* Emergency Section */}
      <div className="py-20 px-6 bg-red-900/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Immediate Assistance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="emergency-card bg-white/10">
              <div className="text-6xl">🚨</div>
              <div className="text-2xl font-bold text-white">Panic Button</div>
              <p className="text-gray-200">Instant emergency alert</p>
            </div>
            <div className="emergency-card bg-white/10">
              <div className="text-6xl">📱</div>
              <div className="text-2xl font-bold text-white">Live Tracking</div>
              <p className="text-gray-200">Share real-time location</p>
            </div>
            <div className="emergency-card bg-white/10">
              <div className="text-6xl">👮♀️</div>
              <div className="text-2xl font-bold text-white">Direct Connect</div>
              <p className="text-gray-200">Local authorities</p>
            </div>
          </div>
        </div>
      </div>
  
      {/* Footer Quote */}
      <div className="py-16 bg-black/30 text-center">
        <p className="text-2xl text-white font-light italic">
          "A woman is like a tea bag - you never know how strong she is until she gets in hot water."<br/>
          <span className="mt-4 block text-pink-300">- @Infinity</span>
        </p>
      </div>
    </div>
  )
}