import { Request, Response } from 'express';
import pool from '../config/database';

export class UserController {
  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      const result = await pool.query(
        'SELECT id, email, first_name, last_name, subscription_type, subscription_status, created_at FROM users WHERE id = $1',
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
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get profile'
      });
    }
  }

  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { firstName, lastName } = req.body;

      const result = await pool.query(
        'UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING id, email, first_name, last_name',
        [firstName, lastName, userId]
      );

      res.status(200).json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update profile'
      });
    }
  }

  static async deleteAccount(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      await pool.query('DELETE FROM users WHERE id = $1', [userId]);

      res.status(200).json({
        success: true,
        message: 'Account deleted successfully'
      });
    } catch (error) {
      console.error('Delete account error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete account'
      });
    }
  }
}