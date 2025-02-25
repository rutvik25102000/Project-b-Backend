import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// Register User
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role });

    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Login User
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
      // Generate Token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.json({ 
        msg: 'Login successful',
        token,  // Adding "Bearer " prefix
        user: { id: user._id, name: user.name, email: user.email, role: user.role } 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };
