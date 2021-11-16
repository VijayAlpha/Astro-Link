import express from 'express';
import {protect} from '../controller/authController.js';
import {getUser , getLoginForm, getSignupForm , getMe , getAddLink} from '../controller/viewsController.js';

const router = express.Router();

router.get('/login', getLoginForm);
router.get('/signup', getSignupForm);
router.get('/me' , protect , getMe)
router.get('/add-link', getAddLink)
router.get('/:username', getUser);


export default router;