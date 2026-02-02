import dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  DB_URI: process.env.DB_URI || 'postgres://user:password@localhost:5432/optiCV',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key',
  AI_API_KEY: process.env.AI_API_KEY || 'your_ai_api_key',
};

export default env;