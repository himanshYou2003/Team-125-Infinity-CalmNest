import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import connectDB from './config/db.js';
import errorHandler from './middlewares/error.js';
import User from './models/User.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL]
  }
});

// Connect DB first
connectDB().then(async () => {
  await User.createDefaultAdmin();
});

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
import ngoRoutes from './routes/ngoRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import authRoutes from './routes/authRoutes.js';
import forumRoutes from './routes/forumRoutes.js';

app.use('/api/v1/ngos', ngoRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/forum', forumRoutes);

app.use(errorHandler);

// Socket.io
io.on('connection', (socket) => {
  console.log('New client connected');
  require('./utils/socket')(socket, io);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});