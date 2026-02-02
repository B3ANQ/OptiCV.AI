import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import sequelize from './config/database';

// Import routes
import authRoutes from './routes/authRoutes';
import cvRoutes from './routes/cvRoutes';
import userRoutes from './routes/userRoutes';
import subscriptionRoutes from './routes/subscriptionRoutes';
import paymentRoutes from './routes/paymentRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/user', userRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/payment', paymentRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'OptiCV.ai API is running' });
});

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');
    
    // Sync database (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();

export default app;