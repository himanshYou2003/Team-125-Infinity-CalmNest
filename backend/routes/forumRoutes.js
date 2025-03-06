import express from 'express';
import {
  createPost,
  deletePost,
  addReply,
  getPost // Add this import
} from '../controllers/forumController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.route('/')
  .get(getPost)
  .post(protect, createPost);

router.route('/:id/replies')
  .post(protect, addReply);

router.route('/:id')
  .get(getPost) // Make sure this controller exists
  .delete(protect, deletePost);

export default router;