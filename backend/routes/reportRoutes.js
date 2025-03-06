import express from 'express';
import { createReport, getReports } from '../controllers/reportController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Public route
router.post('/', createReport);

// Protected route
router.get('/', protect, getReports);

export default router;