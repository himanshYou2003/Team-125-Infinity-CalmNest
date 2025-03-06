import mongoose from 'mongoose';
import { generateAnonymousId } from '../utils/generateAnonymousId.js';

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxlength: 500
  },
  anonymousId: {
    type: String,
    required: true,
    default: generateAnonymousId
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{ timestamps: true });

export default mongoose.model('Message', MessageSchema);