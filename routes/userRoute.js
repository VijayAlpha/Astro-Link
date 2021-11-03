import { Router } from 'express';
import { signup , login , protect} from '../controller/authController.js';
import {getMe , getUser , updateMe, resizeUserPhoto } from '../controller/userController.js';
import {uploadUserImage} from "../utils/imageUpload.js";
const router = Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/me' , protect , getMe);
router.patch('/updateMe' , protect, uploadUserImage , resizeUserPhoto, updateMe);

router.get('/:username', getUser);

export default router;

