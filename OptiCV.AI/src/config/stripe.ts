import Stripe from 'stripe';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
});

export default stripe;