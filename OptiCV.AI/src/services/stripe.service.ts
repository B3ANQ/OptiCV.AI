import Stripe from 'stripe';
import { config } from '../config/stripe';

export class StripeService {
    private stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(config.apiKey, {
            apiVersion: '2020-08-27',
        });
    }

    async createPaymentIntent(amount: number, currency: string) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                amount,
                currency,
            });
            return paymentIntent;
        } catch (error) {
            throw new Error(`Failed to create payment intent: ${error.message}`);
        }
    }

    async confirmPaymentIntent(paymentIntentId: string) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId);
            return paymentIntent;
        } catch (error) {
            throw new Error(`Failed to confirm payment intent: ${error.message}`);
        }
    }

    async retrievePaymentIntent(paymentIntentId: string) {
        try {
            const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
            return paymentIntent;
        } catch (error) {
            throw new Error(`Failed to retrieve payment intent: ${error.message}`);
        }
    }
}