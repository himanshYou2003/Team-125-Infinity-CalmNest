import mongoose from 'mongoose';
import { generateAnonymousId } from '../utils/generateAnonymousId.js';

const ReplySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  anonymousId: {
    type: String,
    required: true,
    default: () => generateAnonymousId()
  },
  content: {
    type: String,
    required: [true, 'Please add reply content'],
    maxlength: [500, 'Reply cannot be more than 500 characters']
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
}, {
  timestamps: true
});

ReplySchema.methods.toJSON = function() {
  const reply = this.toObject();
  delete reply.user;
  return reply;
};

export default mongoose.model('Reply', ReplySchema);