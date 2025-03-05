import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';
import Reply from '../models/Reply.js';

// @desc    Create new post
// @route   POST /api/v1/forum/posts
export const createPost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  
  const post = await Post.create({
    title,
    content,
    category,
    user: req.user.id
  });

  // Broadcast new post via Socket.io
  req.io.emit('new-post', post);
  
  res.status(201).json({ success: true, data: post });
});

// @desc    Add reply to post
// @route   POST /api/v1/forum/posts/:id/replies
export const addReply = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if(!post) {
    return res.status(404).json({ success: false, error: 'Post not found' });
  }

  const reply = await Reply.create({
    content: req.body.content,
    post: req.params.id,
    user: req.user.id
  });

  // Broadcast new reply via Socket.io
  req.io.to(req.params.id).emit('new-reply', reply);
  
  res.status(201).json({ success: true, data: reply });
});

// @desc    Get all posts
// @route   GET /api/v1/forum/posts
export const getPosts = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const query = category ? { category } : {};

  const posts = await Post.find(query)
    .sort('-createdAt')
    .populate('user', 'name')
    .populate({
      path: 'replies',
      populate: { path: 'user', select: 'name' }
    });

  res.json({ success: true, count: posts.length, data: posts });
});

// @desc    Delete post (Admin only)
// @route   DELETE /api/v1/forum/posts/:id
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if(!post) {
    return res.status(404).json({ success: false, error: 'Post not found' });
  }

  await Reply.deleteMany({ post: post._id });
  
  await post.deleteOne();

  req.io.emit('delete-post', post._id);
  
  res.json({ success: true, data: {} });
});