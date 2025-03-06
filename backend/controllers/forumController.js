import asyncHandler from 'express-async-handler';
import Post from '../models/Post.js';
import Reply from '../models/Reply.js';

export const createPost = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  
  const post = await Post.create({
    title,
    content,
    category,
    user: req.user.id
  });

  const sanitizedPost = post.toJSON();
  req.io.emit('new-post', sanitizedPost);
  
  res.status(201).json({ success: true, data: sanitizedPost });
});

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

  const sanitizedReply = reply.toJSON();
  req.io.to(req.params.id).emit('new-reply', sanitizedReply);
  
  res.status(201).json({ success: true, data: sanitizedReply });
});

export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: 'replies',
      select: '-user'
    });

  if (!post) {
    return res.status(404).json({ success: false, error: 'Post not found' });
  }

  res.json({ success: true, data: post });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if(!post) {
    return res.status(404).json({ success: false, error: 'Post not found' });
  }

  if(post.user.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: 'Not authorized' });
  }

  await Reply.deleteMany({ post: post._id });
  await post.deleteOne();

  req.io.emit('delete-post', post._id);
  
  res.json({ success: true, data: {} });
});