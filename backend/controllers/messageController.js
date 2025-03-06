import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';
import { generateAnonymousId } from '../utils/generateAnonymousId.js';

export const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find()
    .sort('-createdAt')
    .limit(50);
    
  res.json({ success: true, data: messages.reverse() });
});

export const createMessage = asyncHandler(async (req, res) => {
    const { content, anonymousId } = req.body;
    
    const message = await Message.create({
      content,
      anonymousId: anonymousId || generateAnonymousId()
    });
  
    res.status(201).json({ success: true, data: message });
  });