import express from 'express';
import { register, login } from '../controllers/authController.js';
import { check } from 'express-validator';

const router = express.Router();

// Register route with validation
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 3 }),
  ],
  register
);

// Login route (FIXED: Removed isAdmin from here)
router.post('/login', login);

export default router;
