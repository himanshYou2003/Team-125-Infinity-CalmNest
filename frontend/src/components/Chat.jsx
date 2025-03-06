import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

export default function CommunityChat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [anonymousId, setAnonymousId] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Get or create anonymous ID
    const storedId = localStorage.getItem('anonymousId') || generateAnonymousId();
    setAnonymousId(storedId);
    localStorage.setItem('anonymousId', storedId);

    // Fetch message history
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/messages`);
        setMessages(data.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchMessages();

    // Setup socket connection
    const newSocket = io(import.meta.env.VITE_SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => newSocket.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    socket.emit('send_message', {
      content: newMessage.trim(),
      anonymousId
    });

    setNewMessage('');
  };

  return (
    <div className="min-w-4xl mx-auto p-4">
      <div className="w-full min-h-10xl mb-4">
        <h2 className="text-4xl font-bold mb-4">Community Chat</h2>
        <div className="mb-4 text-lg font-medium text-gray-800">
        Your Anonymous ID: <span className="text-pink-600 dark:text-pink-700">{anonymousId}</span>
        </div>
        
        <div className="h-96 overflow-y-auto mb-4">
          {messages.map(message => (
            <div key={message._id} className="mb-4">
              <div className="flex items-center text-sm font-bold mb-1">
                <span className="font-medium text-[#7c3ac2] mr-2">
                  {message.anonymousId}
                </span>
                <span className="text-gray-500">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <p className="bg-gray-100 p-3 rounded-lg">
                {message.content}
              </p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 border rounded mb-2"
            maxLength="500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

// Generate random animal-based ID
const generateAnonymousId = () => {
  const animals = ['Tiger', 'Elephant', 'Peacock', 'Lion', 'Bear', 'Wolf'];
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];
  return `${colors[Math.floor(Math.random() * colors.length)]}-${
    animals[Math.floor(Math.random() * animals.length)]
  }-${Math.floor(100 + Math.random() * 900)}`;
};