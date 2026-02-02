import { Payment } from '../models/Payment';
import { User } from '../models/User';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
});

export class PaymentService {
  async createPaymentIntent(amount: number, currency: string): Promise<Stripe.PaymentIntent> {
    return await stripe.paymentIntents.create({
      amount,
      currency,
    });
  }

  async handleWebhook(body: any, signature: string): Promise<void> {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    
    // Traiter l'événement
    console.log('Webhook received:', event.type);
  }
}