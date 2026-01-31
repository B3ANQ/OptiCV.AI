import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Create payment intent
router.post('/create-intent', authenticate, PaymentController.createPaymentIntent);

// Confirm payment
router.post('/confirm', authenticate, PaymentController.confirmPayment);

// Webhook for Stripe events
router.post('/webhook', PaymentController.handleWebhook);

export default router;