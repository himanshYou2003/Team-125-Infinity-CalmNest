import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please add reply content'],
    maxlength: [500, 'Reply cannot be more than 500 characters']
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Reply', ReplySchema);