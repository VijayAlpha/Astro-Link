import express from 'express';
import { protect } from '../controller/authController.js';
import {
  createLink,
  getLink,
  resizeLinkPhoto,
  deleteLink,
  editLink,
} from '../controller/linkController.js';
import { uploadImage } from '../utils/imageUpload.js';
const router = express.Router();

router.post('/addLink', protect, uploadImage, resizeLinkPhoto, createLink);
router.delete('/deleteLink', protect, deleteLink);
router.get('/getLink', getLink);

router.patch('/:id', protect, uploadImage, resizeLinkPhoto, editLink);

export default router;
