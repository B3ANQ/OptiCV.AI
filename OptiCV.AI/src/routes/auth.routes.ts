import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateUser } from '../middleware/validation.middleware';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Register new user
router.post('/register', validateUser, AuthController.register);

// Login user
router.post('/login', validateUser, AuthController.login);

// Get current user (protected route)
router.get('/me', authenticate, AuthController.getCurrentUser);

export default router;