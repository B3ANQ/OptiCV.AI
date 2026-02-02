import { Router } from 'express';
import { SubscriptionController } from '../controllers/subscriptionController';

const router = Router();
const subscriptionController = new SubscriptionController();

router.post('/subscribe', subscriptionController.subscribe.bind(subscriptionController));
router.post('/cancel', subscriptionController.cancel.bind(subscriptionController));
router.get('/status', subscriptionController.getStatus.bind(subscriptionController));
router.put('/upgrade', subscriptionController.upgrade.bind(subscriptionController));

export default router;