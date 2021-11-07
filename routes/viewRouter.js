import express from 'express';
import {getUser , getLoginForm} from '../controller/viewsController.js';

const router = express.Router();

router.get('/login', getLoginForm);
router.get('/:username', getUser);


export default router;