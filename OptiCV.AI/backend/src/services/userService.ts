import { User } from '../models/User';

export class UserService {
  async getUserById(userId: string): Promise<any | null> {
    return await User.findByPk(userId);
  }

  async getAllUsers(): Promise<any[]> {
    return await User.findAll();
  }

  async updateUser(userId: string, data: any): Promise<any | null> {
    const user = await User.findByPk(userId);
    if (user) {
      return await user.update(data);
    }
    return null;
  }

  async deleteUser(userId: string): Promise<boolean> {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }
}