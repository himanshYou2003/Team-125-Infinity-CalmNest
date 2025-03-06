import express from 'express';
import { 
  signup,
  login,
  getCurrentUser,
  updateUserDetails
} from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);
router.put('/updatedetails', protect, updateUserDetails);

export default router;