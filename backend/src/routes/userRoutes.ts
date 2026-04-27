import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';
import { getMe, updateMe, deleteMe, getUsers } from '../controllers/userController';

const router = Router();

router.use(protect); // todas as rotas abaixo exigem token

router.get('/',    getUsers);
router.get('/me', getMe);
router.put('/me', updateMe);
router.delete('/me', deleteMe);

export default router;