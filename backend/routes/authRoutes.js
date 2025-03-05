import express from 'express';
import { 
  loginAdmin,
  getCurrentUser,
  updateAdminDetails
} from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/me', protect, getCurrentUser);
router.put('/updatedetails', protect, updateAdminDetails);

export default router;