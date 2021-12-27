const express = require('express');
const authController = require('../controller/authController.js');
const viewController = require('../controller/viewsController.js');

const router = express.Router();

router.get('/', viewController.home);
router.get('/:username', viewController.getUser);
router.get('/signup', viewController.getSignupForm);
router.get('/login', viewController.getLoginForm);
router.get('/logout', authController.logout);
router.get('/me', authController.protect, viewController.getMe);
router.get('/settings', authController.protect, viewController.getSettings);
router.get(
  '/settings/:pages',
  authController.protect,
  viewController.getSettings
);
router.get('/add-link', authController.protect, viewController.getAddLink);
router.get('/link/:id', authController.protect, viewController.getEditLink);
// router.get("/:username", getUser);

module.exports = router;
