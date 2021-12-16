import express from "express";
import { protect, logout } from "../controller/authController.js";
import {
  getUser,
  getLoginForm,
  getSignupForm,
  getMe,
  getAddLink,   
  getEditLink,                                                     
  getSettings,
} from "../controller/viewsController.js";

const router = express.Router();

router.get("/:username", getUser);
router.get("/signup", getSignupForm);
router.get("/login", getLoginForm);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.get("/settings", protect, getSettings);
router.get("/settings/:pages", protect, getSettings);
router.get("/add-link" , protect, getAddLink);
router.get("/link/:id" , protect, getEditLink);
// router.get("/:username", getUser);

export default router;
