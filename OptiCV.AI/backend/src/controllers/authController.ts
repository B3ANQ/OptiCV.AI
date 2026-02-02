import { Router } from 'express';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, firstName, lastName } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcryptjs.hash(password, 10);
      const user = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      res.status(201).json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await bcryptjs.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  }
}

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

export default router;