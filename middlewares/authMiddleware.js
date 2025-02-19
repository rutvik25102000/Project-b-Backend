import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log("Received Auth Header:", authHeader); // Debugging log

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const token = authHeader.split(' ')[1]; 
    console.log("Extracted Token:", token); // Debugging log

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging log

    req.user = decoded; 
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error); // Debugging log
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};


// Admin Check Middleware (role-based access)
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};
