import { CV } from '../models/CV';
import { AIService } from './aiService';

export class CVService {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  async generateCV(userId: string, cvData: any): Promise<any> {
    const optimizedData = await this.aiService.optimizeCV(cvData);
    
    const cv = await CV.create({
      userId,
      data: optimizedData,
      createdAt: new Date()
    });
    
    return cv;
  }

  async getUserCVs(userId: string): Promise<any[]> {
    return await CV.findAll({ where: { userId } });
  }

  async getCVById(cvId: string): Promise<any | null> {
    return await CV.findByPk(cvId);
  }

  async deleteCV(cvId: string, userId: string): Promise<boolean> {
    const cv = await CV.findOne({ where: { id: cvId, userId } });
    if (cv) {
      await cv.destroy();
      return true;
    }
    return false;
  }
}