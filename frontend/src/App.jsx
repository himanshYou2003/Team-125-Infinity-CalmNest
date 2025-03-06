import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { SocketProvider } from './contexts/SocketContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Profile from './pages/Profile'
import NGOSearch from './pages/NGO/NGOSearch'
import CreatePost from './pages/Forum/CreatePost'
import PostDetails from './pages/Forum/PostDetails'
import CreateReport from './pages/Report/CreateReport'
import Chat from './components/Chat'

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          
        <div class="absolute top-0 -z-10 h-full w-full bg-white"><div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div></div>
          <Navbar />

          {/* <main className="container mx-auto "> */}
            <Routes>
              <Route path="/" element={<Home />} />   
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/ngos" element={<NGOSearch />} />
              <Route path="/forum/create" element={<CreatePost />} />
              <Route path="/forum/:id" element={<PostDetails />} />
              <Route path="/report" element={<CreateReport />} />
              <Route path="/chat" element={<Chat />} />

            </Routes>
          {/* </main> */}
          
        </SocketProvider>
      </AuthProvider>
    </Router>
  )
}