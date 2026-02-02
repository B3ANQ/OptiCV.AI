import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscriptionService';

export class SubscriptionController {
  private subscriptionService: SubscriptionService;

  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  async subscribe(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { plan, paymentMethodId } = req.body;
      
      const subscription = await this.subscriptionService.createSubscription(
        userId,
        plan,
        paymentMethodId
      );
      
      res.status(200).json({ subscription });
    } catch (error) {
      res.status(500).json({ message: 'Error creating subscription', error });
    }
  }

  async cancel(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const success = await this.subscriptionService.cancelSubscription(userId);
      
      if (success) {
        res.status(200).json({ message: 'Subscription cancelled successfully' });
      } else {
        res.status(404).json({ message: 'Subscription not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error cancelling subscription', error });
    }
  }

  async getStatus(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const subscription = await this.subscriptionService.getSubscription(userId);
      
      res.status(200).json({ subscription });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching subscription', error });
    }
  }

  async upgrade(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { newPlan } = req.body;
      
      const success = await this.subscriptionService.upgradeSubscription(userId, newPlan);
      
      if (success) {
        res.status(200).json({ message: 'Subscription upgraded successfully' });
      } else {
        res.status(404).json({ message: 'Subscription not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error upgrading subscription', error });
    }
  }
}