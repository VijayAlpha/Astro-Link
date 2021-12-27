const express = require('express');
const authController = require('../controller/authController.js');
const userController = require('../controller/userController.js');
const imageController = require('../utils/imageUpload.js');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.get('/:username', userController.getUser);

router.get('/me', authController.protect, userController.getMe);
router.patch(
  '/updateMe',
  authController.protect,
  imageController.uploadUserImage,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

module.exports = router;
