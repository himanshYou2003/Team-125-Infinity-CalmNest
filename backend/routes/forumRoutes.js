import express from 'express';
import {
  createPost,
  getPosts,
  deletePost,
  addReply
} from '../controllers/forumController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .delete(protect, authorize('admin', 'moderator'), deletePost);

router.route('/:id/replies')
  .post(protect, addReply);

export default router;