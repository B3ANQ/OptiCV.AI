import { Router } from 'express';
import { PaymentController } from '../controllers/paymentController';

const router = Router();
const paymentController = new PaymentController();

router.post('/create-payment-intent', paymentController.createPaymentIntent.bind(paymentController));
router.post('/webhook', paymentController.handleWebhook.bind(paymentController));

export default router;