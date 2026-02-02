import { Subscription } from '../models/Subscription';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
});

export class SubscriptionService {
  async createSubscription(userId: string, plan: string, paymentMethodId?: string): Promise<any> {
    try {
      // Créer l'abonnement dans Stripe (pour les plans payants)
      let stripeSubscriptionId = null;
      
      if (plan !== 'free' && paymentMethodId) {
        const stripeCustomer = await stripe.customers.create({
          metadata: { userId }
        });

        await stripe.paymentMethods.attach(paymentMethodId, {
          customer: stripeCustomer.id,
        });

        await stripe.customers.update(stripeCustomer.id, {
          invoice_settings: { default_payment_method: paymentMethodId },
        });

        const priceId = plan === 'premium_monthly' 
          ? process.env.STRIPE_PRICE_MONTHLY 
          : process.env.STRIPE_PRICE_YEARLY;

        const stripeSubscription = await stripe.subscriptions.create({
          customer: stripeCustomer.id,
          items: [{ price: priceId }],
          expand: ['latest_invoice.payment_intent'],
        });

        stripeSubscriptionId = stripeSubscription.id;
      }

      // Sauvegarder dans PostgreSQL
      const newSubscription = await Subscription.create({
        userId,
        plan,
        status: 'active',
        stripeSubscriptionId,
        createdAt: new Date()
      });

      return newSubscription;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  }

  async getSubscription(userId: string): Promise<any | null> {
    return await Subscription.findOne({ where: { userId } });
  }

  async getSubscriptionById(subscriptionId: string): Promise<any | null> {
    return await Subscription.findByPk(subscriptionId);
  }

  async getAllSubscriptions(): Promise<any[]> {
    return await Subscription.findAll();
  }

  async updateSubscription(subscriptionId: string, updatedData: any): Promise<any | null> {
    const subscription = await Subscription.findByPk(subscriptionId);
    if (subscription) {
      return await subscription.update(updatedData);
    }
    return null;
  }

  async upgradeSubscription(userId: string, newPlan: string): Promise<boolean> {
    try {
      const subscription = await this.getSubscription(userId);
      if (!subscription) return false;

      // Mettre à jour dans Stripe si c'est un plan payant
      if (subscription.stripeSubscriptionId) {
        const stripeSubscription = await stripe.subscriptions.retrieve(
          subscription.stripeSubscriptionId
        );

        const newPriceId = newPlan === 'premium_monthly'
          ? process.env.STRIPE_PRICE_MONTHLY
          : process.env.STRIPE_PRICE_YEARLY;

        await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
          items: [{
            id: stripeSubscription.items.data[0].id,
            price: newPriceId,
          }],
        });
      }

      // Mettre à jour dans PostgreSQL
      await subscription.update({ plan: newPlan });
      return true;
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      return false;
    }
  }

  async cancelSubscription(userId: string): Promise<boolean> {
    try {
      const subscription = await this.getSubscription(userId);
      if (!subscription) return false;

      // Annuler dans Stripe
      if (subscription.stripeSubscriptionId) {
        await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);
      }

      // Supprimer ou mettre à jour le statut dans PostgreSQL
      await subscription.update({ status: 'cancelled' });
      return true;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      return false;
    }
  }

  async handleWebhook(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'customer.subscription.deleted':
        const deletedSub = event.data.object as Stripe.Subscription;
        await Subscription.update(
          { status: 'cancelled' },
          { where: { stripeSubscriptionId: deletedSub.id } }
        );
        break;

      case 'customer.subscription.updated':
        const updatedSub = event.data.object as Stripe.Subscription;
        await Subscription.update(
          { status: updatedSub.status },
          { where: { stripeSubscriptionId: updatedSub.id } }
        );
        break;
    }
  }
}