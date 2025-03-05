import express from 'express';
import { createReport, getReports } from '../controllers/reportController.js';
import { protect, authorize } from '../middlewares/auth.js';

const router = express.Router();

// Public route
router.post('/', createReport);

// Admin protected routes
router.use(protect, authorize('admin'));
router.get('/', getReports);

export default router;