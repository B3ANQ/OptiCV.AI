import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';

export class PaymentController {
    private paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    public async processPayment(req: Request, res: Response): Promise<void> {
        try {
            const paymentData = req.body;
            const paymentResult = await this.paymentService.processPayment(paymentData);
            res.status(200).json(paymentResult);
        } catch (error) {
            res.status(500).json({ message: 'Payment processing failed', error: error.message });
        }
    }

    public async getPaymentHistory(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            const paymentHistory = await this.paymentService.getPaymentHistory(userId);
            res.status(200).json(paymentHistory);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve payment history', error: error.message });
        }
    }

    async createPaymentIntent(req: Request, res: Response) {
        try {
            const { amount, currency } = req.body;

            if (!amount || !currency) {
                return res.status(400).json({ message: 'Amount and currency are required' });
            }

            const paymentIntent = await this.paymentService.createPaymentIntent(amount, currency);

            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            res.status(500).json({ message: 'Error creating payment intent', error });
        }
    }

    async handleWebhook(req: Request, res: Response) {
        try {
            const sig = req.headers['stripe-signature'] as string;

            if (!sig) {
                return res.status(400).json({ message: 'Missing stripe signature' });
            }

            await this.paymentService.handleWebhook(req.body, sig);

            res.status(200).json({ received: true });
        } catch (error) {
            res.status(400).json({ message: 'Webhook error', error });
        }
    }
}