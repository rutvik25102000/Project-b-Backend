import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import {authenticate} from '../middlewares/authMiddleware.js';
const router = express.Router();

// Create a category
router.post('/create', createCategory);

// Get all categories
router.get('/getcategories', getCategories);

// Get a category by ID
router.get('/:id', getCategoryById);

// Update a category
router.put('/:id',authenticate, updateCategory);

// Delete a category
router.delete('/deletecategory/:id', deleteCategory);

export default router;
