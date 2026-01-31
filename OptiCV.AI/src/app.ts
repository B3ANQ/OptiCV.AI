import express from 'express';
import { json } from 'body-parser';
import { connectDatabase } from './config/database';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import cvRoutes from './routes/cv.routes';
import subscriptionRoutes from './routes/subscription.routes';
import paymentRoutes from './routes/payment.routes';
import { errorHandler } from './middleware/error.middleware';
import { validateRequest } from './middleware/validation.middleware';
import { authenticate } from './middleware/auth.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());
app.use(authenticate);
app.use(validateRequest);

// Connect to the database
connectDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cvs', cvRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});