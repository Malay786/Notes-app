import express from 'express';
import { getProfile, login, signUp } from '../controllers/authController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';
const router = express.Router();


router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile", protectedRoute, getProfile);

export default router;