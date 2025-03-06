//src/pages/Profile.jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

export default function Profile() {
  const { user, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [updateSuccess, setUpdateSuccess] = useState(false)

  useEffect(() => {
    if (user) setEmail(user.email)
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/updatedetails`,
        { email },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` 
         }
    }
      )
      setUpdateSuccess(true)
      setTimeout(() => setUpdateSuccess(false), 3000)
    } catch (error) {
      alert(error.response.data.error)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Email Address</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full mb-4">
            Update Details
          </button>
          {updateSuccess && (
            <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
              Profile updated successfully!
            </div>
          )}
        </form>
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button 
            onClick={logout}
            className="w-full text-red-600 hover:text-red-700 font-medium"
          >
            Logout from your account
          </button>
        </div>
      </div>
    </div>
  )
}