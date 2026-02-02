import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

export class AIService {
  async optimizeCV(cvData: any): Promise<any> {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured, returning original data');
      return cvData;
    }

    try {
      const prompt = `Optimize this CV data for ATS systems: ${JSON.stringify(cvData)}`;
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('Error optimizing CV:', error);
      return cvData;
    }
  }

  async generateSuggestions(cvData: any): Promise<string[]> {
    if (!process.env.OPENAI_API_KEY) {
      return ['Add OpenAI API key to enable AI suggestions'];
    }

    try {
      const prompt = `Generate 5 suggestions to improve this CV: ${JSON.stringify(cvData)}`;
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      });

      return response.choices[0].message.content?.split('\n') || [];
    } catch (error) {
      console.error('Error generating suggestions:', error);
      return [];
    }
  }
}