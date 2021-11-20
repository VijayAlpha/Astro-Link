import express from 'express';
import {protect} from '../controller/authController.js';
import {getUser , getLoginForm, getSignupForm , getMe , getAddLink , getSocialLinks , getSettings} from '../controller/viewsController.js';

const router = express.Router();

router.get('/login', getLoginForm);
router.get('/signup', getSignupForm);
router.get('/me' , protect , getMe);
router.get('/settings', protect , getSettings);
router.get('/add-link', getAddLink);
router.get('/social-links', getSocialLinks);
router.get('/:username', getUser);


export default router;