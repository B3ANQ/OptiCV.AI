import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Get user profile
router.get('/profile', authenticate, UserController.getProfile);

// Update user profile
router.put('/profile', authenticate, UserController.updateProfile);

// Delete user account
router.delete('/account', authenticate, UserController.deleteAccount);

export default router;