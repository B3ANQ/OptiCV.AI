import { Request, Response } from 'express';
import pool from '../config/database';

export class SubscriptionController {
  static async getSubscription(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      const result = await pool.query(
        'SELECT subscription_type, subscription_status, subscription_end_date FROM users WHERE id = $1',
        [userId]
      );

      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          error: 'User not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Get subscription error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get subscription'
      });
    }
  }

  static async createSubscription(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { planType } = req.body; // 'premium_monthly' or 'premium_annual'

      // TODO: Integrate with Stripe payment

      const endDate = planType === 'premium_annual' 
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      const result = await pool.query(
        'UPDATE users SET subscription_type = $1, subscription_status = $2, subscription_end_date = $3 WHERE id = $4 RETURNING subscription_type, subscription_status, subscription_end_date',
        [planType, 'active', endDate, userId]
      );

      res.status(200).json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Create subscription error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create subscription'
      });
    }
  }

  static async cancelSubscription(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      await pool.query(
        'UPDATE users SET subscription_status = $1 WHERE id = $2',
        ['cancelled', userId]
      );

      res.status(200).json({
        success: true,
        message: 'Subscription cancelled successfully'
      });
    } catch (error) {
      console.error('Cancel subscription error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to cancel subscription'
      });
    }
  }
}