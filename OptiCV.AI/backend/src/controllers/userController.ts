import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const user = await this.userService.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile', error });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const updatedUser = await this.userService.updateUser(userId, req.body);
      
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error });
    }
  }

  async deleteAccount(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      await this.userService.deleteUser(userId);
      
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting account', error });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  }
}