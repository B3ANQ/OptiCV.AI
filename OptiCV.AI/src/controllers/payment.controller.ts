import { Request, Response } from 'express';
import Stripe from 'stripe';
import pool from '../config/database';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27'
});

export class PaymentController {
  static async createPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { planType } = req.body; // 'premium_monthly' or 'premium_annual'

      const amounts = {
        premium_monthly: 999, // 9.99 EUR in cents
        premium_annual: 9999  // 99.99 EUR in cents
      };

      const amount = amounts[planType as keyof typeof amounts];

      if (!amount) {
        res.status(400).json({
          success: false,
          error: 'Invalid plan type'
        });
        return;
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur',
        metadata: {
          userId: userId!.toString(),
          planType
        }
      });

      res.status(200).json({
        success: true,
        data: {
          clientSecret: paymentIntent.client_secret
        }
      });
    } catch (error) {
      console.error('Create payment intent error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create payment intent'
      });
    }
  }

  static async confirmPayment(req: Request, res: Response): Promise<void> {
    try {
      const { paymentIntentId } = req.body;

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status === 'succeeded') {
        const userId = parseInt(paymentIntent.metadata.userId);
        const planType = paymentIntent.metadata.planType;

        const endDate = planType === 'premium_annual'
          ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await pool.query(
          'UPDATE users SET subscription_type = $1, subscription_status = $2, subscription_end_date = $3 WHERE id = $4',
          [planType, 'active', endDate, userId]
        );

        res.status(200).json({
          success: true,
          message: 'Payment confirmed and subscription activated'
        });
      } else {
        res.status(400).json({
          success: false,
          error: 'Payment not successful'
        });
      }
    } catch (error) {
      console.error('Confirm payment error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to confirm payment'
      });
    }
  }

  static async handleWebhook(req: Request, res: Response): Promise<void> {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

      switch (event.type) {
        case 'payment_intent.succeeded':
          console.log('Payment succeeded:', event.data.object);
          break;
        case 'payment_intent.payment_failed':
          console.log('Payment failed:', event.data.object);
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.status(200).json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).json({
        success: false,
        error: 'Webhook signature verification failed'
      });
    }
  }
}