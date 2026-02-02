import { Router } from 'express';
import { CVController } from '../controllers/cvController';

const router = Router();
const cvController = new CVController();

router.post('/generate', cvController.generateCV.bind(cvController));
router.get('/', cvController.getCVs.bind(cvController));
router.get('/:id', cvController.getCV.bind(cvController));
router.delete('/:id', cvController.deleteCV.bind(cvController));

export default router;