import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.get('/profile', userController.getProfile.bind(userController));
router.put('/profile', userController.updateProfile.bind(userController));
router.delete('/account', userController.deleteAccount.bind(userController));
router.get('/all', userController.getAllUsers.bind(userController));

export default router;