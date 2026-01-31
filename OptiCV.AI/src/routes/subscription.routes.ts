import { Router } from 'express';
import { SubscriptionController } from '../controllers/subscription.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Get current subscription
router.get('/', authenticate, SubscriptionController.getSubscription);

// Create/Update subscription
router.post('/create', authenticate, SubscriptionController.createSubscription);

// Cancel subscription
router.post('/cancel', authenticate, SubscriptionController.cancelSubscription);

export default router;