const express = require('express');
const authController = require('../controller/authController.js');
const linkController = require('../controller/linkController.js');
const imageUpload = require('../utils/imageUpload.js');
const router = express.Router();

router.post(
  '/addLink',
  authController.protect,
  imageUpload.uploadImage,
  linkController.resizeLinkPhoto,
  linkController.createLink
);
router.delete('/deleteLink', authController.protect, linkController.deleteLink);
router.get('/getLink', linkController.getLink);

router.patch(
  '/:id',
  authController.protect,
  imageUpload.uploadImage,
  linkController.resizeLinkPhoto,
  linkController.editLink
);

module.exports = router;
