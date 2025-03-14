import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Received Auth Header:", authHeader); // Debugging log

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Fix: Ensure we extract the last part of the token
    const tokenParts = authHeader.split(" ");
    const token = tokenParts[tokenParts.length - 1]; // Get last part (actual token)

    if (!token || token === "Bearer") {
      return res.status(401).json({ message: "Invalid token format." });
    }

    console.log("Extracted Token:", token); // Debugging log

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging log

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error); // Debugging log
    res.status(401).json({ message: "Invalid or expired token." });
  }
};



// Admin Check Middleware (role-based access)
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};
