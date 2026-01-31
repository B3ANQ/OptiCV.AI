import { Router } from 'express';
import { CvController } from '../controllers/cv.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateCV } from '../middleware/validation.middleware';

const router = Router();

// Create new CV
router.post('/', authenticate, validateCV, CvController.createCV);

// Get all user's CVs
router.get('/', authenticate, CvController.getUserCVs);

// Get CV by ID
router.get('/:id', authenticate, CvController.getCVById);

// Update CV
router.put('/:id', authenticate, CvController.updateCV);

// Delete CV
router.delete('/:id', authenticate, CvController.deleteCV);

// Optimize CV with AI
router.post('/:id/optimize', authenticate, CvController.optimizeCV);

export default router;