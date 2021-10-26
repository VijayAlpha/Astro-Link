import { Router } from 'express';
import { protect } from '../controller/authController.js';
import { createLink ,  getLink} from '../controller/linkController.js';
const router = Router();

router.post('/addLink', protect, createLink);
router.get('/getLink' , getLink)

export default router;