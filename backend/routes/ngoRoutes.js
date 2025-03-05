import express from 'express';
import {
  getNgos,
  createNgo,
  verifyNgo,
  updateNgo,
  deleteNgo
} from '../controllers/ngoController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public access
router.route('/')
  .get(getNgos);

// Admin protected routes
router.use(protect, authorize('admin'));

router.route('/')
  .post(createNgo);

router.route('/:id/verify')
  .put(verifyNgo);

router.route('/:id')
  .put(updateNgo)
  .delete(deleteNgo);

export default router;