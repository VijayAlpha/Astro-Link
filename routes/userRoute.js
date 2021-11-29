import express from 'express';
import { signup , login , logout , protect , updatePassword} from '../controller/authController.js';
import {getMe , getUser , updateMe, resizeUserPhoto } from '../controller/userController.js';
import {uploadUserImage} from "../utils/imageUpload.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/:username', getUser);

router.get('/me' , protect , getMe);
router.patch('/updateMe' , protect, uploadUserImage , resizeUserPhoto, updateMe);
router.patch('/updateMyPassword', protect , updatePassword);


export default router;

