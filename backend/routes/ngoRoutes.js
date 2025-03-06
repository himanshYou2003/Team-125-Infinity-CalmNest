import express from 'express';
import { getNgos, createNgo } from '../controllers/ngoController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.route('/')
  .get(getNgos)
  .post(createNgo);

export default router;