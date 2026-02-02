import { Request, Response } from 'express';
import { CVService } from '../services/cvService';

export class CVController {
  private cvService: CVService;

  constructor() {
    this.cvService = new CVService();
  }

  async generateCV(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const cvData = req.body;

      const cv = await this.cvService.generateCV(userId, cvData);
      res.status(200).json({ cv });
    } catch (error) {
      res.status(500).json({ message: 'Error generating CV', error });
    }
  }

  async getCVs(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const cvs = await this.cvService.getUserCVs(userId);
      res.status(200).json({ cvs });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching CVs', error });
    }
  }

  async getCV(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cv = await this.cvService.getCVById(id);

      if (!cv) {
        return res.status(404).json({ message: 'CV not found' });
      }

      res.status(200).json({ cv });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching CV', error });
    }
  }

  async deleteCV(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = (req as any).userId;

      await this.cvService.deleteCV(id, userId);
      res.status(200).json({ message: 'CV deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting CV', error });
    }
  }
}