//src/components/PostCard.jsx
import { Link } from 'react-router-dom'
import { ChatBubbleLeftIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function PostCard({ post }) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
          {post.category.replace('-', ' ')}
        </span>
        <div className="flex items-center text-gray-500 text-sm">
          <ClockIcon className="h-4 w-4 mr-1" />
          {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      <div className="flex items-center justify-between">
        <Link 
          to={`/forum/${post._id}`}
          className="btn-primary flex items-center"
        >
          <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
          {post.replies.length} Replies
        </Link>
        <span className="text-sm text-gray-500 font-medium">
          {post.anonymousId}
        </span>
      </div>
    </div>
  )
}