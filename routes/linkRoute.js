import express from 'express';
import { protect } from '../controller/authController.js';
import { createLink ,  getLink , resizeLinkPhoto} from '../controller/linkController.js';
import {uploadImage} from "../utils/imageUpload.js";
const router = express.Router();

router.post('/addLink', protect, uploadImage , resizeLinkPhoto, createLink);
router.get('/getLink' , getLink)

export default router;