import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import connectDB from './config/db.js';
import errorHandler from './middlewares/error.js';
import socketHandler from './utils/socket.js'

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const server = http.createServer(app);

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Connect to MongoDB
connectDB();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Route files
import ngoRoutes from './routes/ngoRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import authRoutes from './routes/authRoutes.js';
import forumRoutes from './routes/forumRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

// Mount routes
app.use('/api/v1/ngos', ngoRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/forum', forumRoutes);
app.use('/api/v1/messages', messageRoutes);

// Error handler middleware
app.use(errorHandler);

// Socket.IO connections
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  socketHandler(socket, io); // Use imported function
  
  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});