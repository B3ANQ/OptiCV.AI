import { Request, Response } from 'express';
import { PaymentService } from '../services/paymentService';

export class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async createPaymentIntent(req: Request, res: Response) {
    try {
      const { amount, currency } = req.body;
      
      if (!amount || !currency) {
        return res.status(400).json({ message: 'Amount and currency are required' });
      }

      const paymentIntent = await this.paymentService.createPaymentIntent(amount, currency);
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ message: 'Error creating payment intent', error: error.message });
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
    } catch (error: any) {
      res.status(400).json({ message: 'Webhook error', error: error.message });
    }
  }
}