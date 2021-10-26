import { Router } from 'express';
import { signup , login , protect} from '../controller/authController.js';
import {getMe , getUser , updateMe , uploadUserPhoto , resizeUserPhoto } from '../controller/userController.js';
const router = Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/me' , protect , getMe);
router.patch('/updateMe' , protect, uploadUserPhoto, resizeUserPhoto, updateMe);

router.get('/:username', getUser);

export default router;

