import express from 'express';
import { createFoodItem, getAllFoodItems, getFoodItemById, updateFoodItem, deleteFoodItemById } from '../controllers/foodController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; 
import {upload} from '../middlewares/upload.js'; 

const router = express.Router();
router.post('/food', authenticate,upload.single('image'), createFoodItem); 
router.get('/food', getAllFoodItems); 
router.get('/food/:id', getFoodItemById); 
router.put('/food/:id', authenticate,upload.single('image'), updateFoodItem);
router.delete('/food/:id', authenticate, deleteFoodItemById);

export default router;
