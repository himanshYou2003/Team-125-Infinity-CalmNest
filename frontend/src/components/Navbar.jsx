import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { HomeIcon, UserIcon, PlusIcon, ArrowRightOnRectangleIcon  ,ChatBubbleOvalLeftIcon} from '@heroicons/react/24/outline'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-[#7f5bc173] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
          <Link to="/" className="text-3xl font-bold text-primary">
            CalmNest
          </Link>
          </div>
          
          <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center  font-medium text-gray-900 hover:text-primary">
    <HomeIcon className="h-5 w-5 mr-1" /> Home
  </Link>
            <Link to="/ngos" className="flex items-center font-medium text-gray-900 hover:text-blue-600">
              NGOs
            </Link>
            
            {user ? (
              <>
                <Link to="/chat" className="flex items-centerfont-medium text-gray-900 hover:text-blue-600">
                  <ChatBubbleOvalLeftIcon className="h-5 w-5 mr-1" /> Chat
                </Link>
                <Link to="/profile" className="flex items-center font-medium text-gray-900 hover:text-blue-600">
                  <UserIcon className="h-5 w-5 mr-1" /> Profile
                </Link>
                <button onClick={logout} className="flex items-center text-red-600 hover:text-red-700">
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary">Login</Link>
                <Link to="/signup" className="btn-primary">Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav> 
  )
}