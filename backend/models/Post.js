import mongoose from 'mongoose';
import { generateAnonymousId } from '../utils/generateAnonymousId.js';

const PostSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
    maxlength: [1000, 'Content cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: true,
    enum: ['safety-tips', 'incident-reports', 'general-discussion']
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  }]
}, {
  timestamps: true
});

PostSchema.methods.toJSON = function() {
  const post = this.toObject();
  delete post.user;
  return post;
};

export default mongoose.model('Post', PostSchema);