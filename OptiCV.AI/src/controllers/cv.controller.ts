import { Request, Response } from 'express';
import pool from '../config/database';

export class CvController {
  static async createCV(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const {
        firstName,
        lastName,
        email,
        phone,
        skills,
        technicalStack,
        languages,
        experiences,
        education,
        projects,
        about,
        drivingLicenses,
        jobTitle,
        cvStyle,
        photo
      } = req.body;

      const result = await pool.query(
        `INSERT INTO cvs (
          user_id, first_name, last_name, email, phone, skills, 
          technical_stack, languages, experiences, education, projects, 
          about, driving_licenses, job_title, cv_style, photo
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) 
        RETURNING *`,
        [
          userId, firstName, lastName, email, phone, 
          JSON.stringify(skills), JSON.stringify(technicalStack), 
          JSON.stringify(languages), JSON.stringify(experiences), 
          JSON.stringify(education), JSON.stringify(projects), 
          about, JSON.stringify(drivingLicenses), jobTitle, cvStyle, photo
        ]
      );

      res.status(201).json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Create CV error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create CV'
      });
    }
  }

  static async getUserCVs(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      const result = await pool.query(
        'SELECT * FROM cvs WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );

      res.status(200).json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Get CVs error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get CVs'
      });
    }
  }

  static async getCVById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id } = req.params;

      const result = await pool.query(
        'SELECT * FROM cvs WHERE id = $1 AND user_id = $2',
        [id, userId]
      );

      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          error: 'CV not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Get CV error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get CV'
      });
    }
  }

  static async updateCV(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id } = req.params;
      const updates = req.body;

      const result = await pool.query(
        'UPDATE cvs SET first_name = $1, last_name = $2, email = $3, updated_at = NOW() WHERE id = $4 AND user_id = $5 RETURNING *',
        [updates.firstName, updates.lastName, updates.email, id, userId]
      );

      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          error: 'CV not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Update CV error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update CV'
      });
    }
  }

  static async deleteCV(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id } = req.params;

      const result = await pool.query(
        'DELETE FROM cvs WHERE id = $1 AND user_id = $2 RETURNING id',
        [id, userId]
      );

      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          error: 'CV not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'CV deleted successfully'
      });
    } catch (error) {
      console.error('Delete CV error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete CV'
      });
    }
  }

  static async optimizeCV(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const { id } = req.params;

      // TODO: Implement AI optimization logic
      res.status(200).json({
        success: true,
        message: 'CV optimization in progress'
      });
    } catch (error) {
      console.error('Optimize CV error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to optimize CV'
      });
    }
  }
}